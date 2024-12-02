import winston from "winston";
import {TelegramBot} from "../../api/TelegramBot.js";
import {existsSync} from "fs";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const tgToken = process.env.TELEGRAM_TOKEN;
const CHAT_ID = +process.env.CHAT_ID;
const TGBot = new TelegramBot({botToken: tgToken, chatId: CHAT_ID});

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
const winstonConfiguration = {
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'combined.log',
            maxsize: 200000,
            maxFiles: 1,
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            maxsize: 200000,
            maxFiles: 1,
        }),
        TGBot,
    ]
}

export {
    winstonConfiguration,
}