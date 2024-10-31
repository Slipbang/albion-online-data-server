import {exec} from 'child_process';
import * as fs from 'fs'
import * as path from "path";

export const startBot = (bot) => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/restart_server', description: 'Перезапустить сервер'},
        {command: '/server_logs', description: 'Логи сервера'},
        {command: '/server_errors', description: 'Ошибки сервера'}
    ])

    bot.on('message', async message => {
            const text = message.text;
            const chatId = message.chat.id;

            try {
                if (text === '/start') {
                    if (chatId === 1117019157) {
                        return bot.sendMessage(chatId, `Бот готов к работе.`);
                    } else {
                        return bot.sendMessage(chatId, `Данный бот предназначен для технического обслуживания сервера Albion-Toolkit`);
                    }
                }


                if (text === '/restart_server') {
                    if (chatId === 1117019157) {
                        exec('npm restart', (error, stdout, stderr) => {
                            if (error) {
                                console.error(`Ошибка: ${error.message}`);
                                bot.sendMessage(chatId, `Ошибка при перезапуске: ${error.message}`);
                                return;
                            }

                            if (stderr) {
                                console.error(`Ошибка: ${stderr}`);
                                bot.sendMessage(chatId, `Ошибка при перезапуске: ${stderr}`);
                                return;
                            }

                            return bot.sendMessage(chatId, 'Приложение успешно перезапущено.');
                        });
                    } else {
                        return bot.sendMessage(chatId, `Доступно только для админа`);
                    }
                }

                if (text === '/server_logs') {
                    if (chatId === 1117019157) {
                        const logFilePath = path.resolve(process.env.HOME || process.env.USERPROFILE, '.pm2/logs/albion-online-data-server-out.log');

                        fs.readFile(logFilePath, 'utf8', (err, data) => {
                            if (err) {
                                bot.sendMessage(chatId, `Ошибка при чтении логов: ${err.message}`);
                                return;
                            }

                            const logContent = data.slice(-2096);
                            return bot.sendMessage(chatId, `Последние логи:\n\n${logContent}`);
                        });

                    } else {
                        return bot.sendMessage(chatId, `Доступно только для админа`);
                    }

                }

                if (text === '/server_errors') {
                    if (chatId === 1117019157) {
                        const logFilePath = path.resolve(process.env.HOME || process.env.USERPROFILE, '.pm2/logs/albion-online-data-server-error.log');

                        fs.readFile(logFilePath, 'utf8', (err, data) => {
                            if (err) {
                                bot.sendMessage(chatId, `Ошибка при чтении логов: ${err.message}`);
                                return;
                            }

                            const logContent = data.slice(-2096);
                            return bot.sendMessage(chatId, `Последние логи:\n\n${logContent}`);
                        });

                    } else {
                        return bot.sendMessage(chatId, `Доступно только для админа`);
                    }

                }

            } catch
                (err) {
                return bot.sendMessage(chatId, `Произошла ошибка (${err.message})`);
            }
        }
    )
}
// --port=3000 --hostname=127.1.1.0
//pm2 start index.js --name "albion-online-data-server"