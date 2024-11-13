//import {exec} from 'child_process';
import * as fs from 'fs';
import TelegramApi from 'node-telegram-bot-api';
import TransportStream from "winston-transport";

export class TelegramBot extends TransportStream{
    constructor(opts) {
        super(opts)
        this.botToken = opts.botToken;
        this.ADMIN_CHAT_ID = +opts.chatId;
        this.bot = new TelegramApi(this.botToken, {polling: true});

        this.bot.setMyCommands([
            {command: '/start', description: 'Приветствие'},
            // {command: '/restart_server', description: 'Перезапустить сервер'},
            {command: '/server_logs', description: 'Логи сервера'},
            {command: '/server_errors', description: 'Ошибки сервера'},
        ])

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
                    // case '/restart_server': {
                    //     if (this.ADMIN_CHAT_ID === chatId) {
                    //         return exec('npm restart', (error, stdout, stderr) => {
                    //             if (error) {
                    //                 console.error(`Ошибка: ${error.message}`);
                    //                 this.bot.sendMessage(chatId, `Ошибка при перезапуске: ${error.message}`);
                    //                 return;
                    //             }
                    //
                    //             if (stderr) {
                    //                 console.error(`Ошибка: ${stderr}`);
                    //                 this.bot.sendMessage(chatId, `Ошибка при перезапуске: ${stderr}`);
                    //                 return;
                    //             }
                    //
                    //             return this.bot.sendMessage(chatId, 'Приложение успешно перезапущено.');
                    //         });
                    //     } else {
                    //         return this.bot.sendMessage(chatId, `Доступно только для админа`);
                    //     }
                    // }
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
                return this.bot.sendMessage(chatId, `Произошла ошибка (${err.message})`);
            }
        })
    }

    log(info, callback) {
        const message = `${info.timestamp} [**${info.level.toUpperCase()}**]: ${info.message}`;

        this.bot.sendMessage(this.ADMIN_CHAT_ID, message, {parse_mode: 'HTML'});

        callback();
    }
}

