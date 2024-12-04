import {format, LoggerOptions, transports} from "winston";
import {TelegramBot} from "../../api/TelegramBot.js";
import {existsSync} from "fs";
import TransportStream from "winston-transport";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const tgToken = process.env.TELEGRAM_TOKEN;
const CHAT_ID = Number(process.env.CHAT_ID);
const TGBot = new TelegramBot({botToken: tgToken!, chatId: CHAT_ID!});

const customFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
const winstonConfiguration: LoggerOptions = {
    level: 'info',
    format: format.combine(
        format.timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'combined.log',
            maxsize: 200000,
            maxFiles: 1,
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            maxsize: 200000,
            maxFiles: 1,
        }),
        TGBot as TransportStream,
    ]
}

export {
    winstonConfiguration,
}