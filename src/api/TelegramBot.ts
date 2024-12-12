import fs from 'fs';
import TelegramApi, {SendMessageOptions} from 'node-telegram-bot-api';
import TransportStream from "winston-transport";
import {Writable} from "stream";

interface IOptions {
    botToken: string;
    chatId: number;
}

export class TelegramBot extends TransportStream implements Writable {
    protected botToken: string;
    protected ADMIN_CHAT_ID: number;
    public bot: TelegramApi;

    constructor(opts: IOptions) {
        super()
        this.botToken = opts.botToken;
        this.ADMIN_CHAT_ID = opts.chatId;
        this.bot = new TelegramApi(this.botToken, {polling: true});

        this.bot.setMyCommands([
            {command: '/start', description: 'Приветствие'},
            {command: '/server_logs', description: 'Логи сервера'},
            {command: '/server_errors', description: 'Ошибки сервера'},
        ]).catch((err) => {
            console.error('setMyCommands errors:', err);
        });

        this.bot.on('message', async message => {
            const text = message.text;
            const chatId = message.chat.id;

            try {
                switch (text) {
                    case '/start': {
                        if (this.ADMIN_CHAT_ID === chatId) {
                            return this.bot.sendMessage(chatId, `Бот готов к работе.`);
                        } else {
                            return this.bot.sendMessage(chatId, `Данный бот предназначен для технического обслуживания сервера Albion-Toolkit.`);
                        }
                    }
                    case '/server_logs': {
                        if (this.ADMIN_CHAT_ID === chatId) {

                            return fs.readFile('./combined.log', 'utf8', (err, data) => {
                                if (err) {
                                    return this.bot.sendMessage(chatId, `Ошибка при чтении логов: ${err.message}`);
                                }

                                const logContent = data.slice(-2096) || 'Логи отсутствуют';
                                return this.bot.sendMessage(chatId, `Последние логи:\n\n${logContent}`);
                            });

                        } else {
                            return this.bot.sendMessage(chatId, `Доступно только для админа`);
                        }
                    }
                    case '/server_errors': {
                        if (this.ADMIN_CHAT_ID === chatId) {

                            return fs.readFile('./error.log', 'utf8', (err, data) => {
                                if (err) {
                                    this.bot.sendMessage(chatId, `Ошибка при чтении логов: ${err.message}`);
                                    return;
                                }

                                const logContent = data.slice(-2096) || 'Логи ошибок отсутствуют';
                                return this.bot.sendMessage(chatId, `Последние логи:\n\n${logContent}`);
                            });

                        } else {
                            return this.bot.sendMessage(chatId, `Доступно только для админа`);
                        }
                    }
                }
            } catch (err) {
                if (err instanceof Error) {
                    return this.bot.sendMessage(chatId, `Произошла ошибка (${err.message})`);
                } else {
                    return this.bot.sendMessage(chatId, 'Неизвестная ошибка:', err as SendMessageOptions );
                }

            }
        })
    }

    messageQueue = [];

    log(info: any, callback: () => void): void {
        const message = `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;

        this.bot.sendMessage(this.ADMIN_CHAT_ID, message)
            .then((sentMessage) => {
                this.messageQueue.push(sentMessage.message_id);
                if (this.messageQueue.length > 5) {
                    const messageIdToDelete = this.messageQueue.shift();
                    this.bot.deleteMessage(this.ADMIN_CHAT_ID, messageIdToDelete)
                        .catch((err) => {
                            console.error("Ошибка удаления старого сообщения:", err);
                        });
                }
            })
            .catch((err) => {
                console.error('Error sending log to Telegram:', err);
            });

        callback();
    }

}

