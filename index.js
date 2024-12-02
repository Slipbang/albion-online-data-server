import fetch from "node-fetch";
import express from 'express';
import winston from "winston";
import fs from "fs/promises";
import {existsSync} from 'fs';

import {EquipmentItemsCalculation} from "./src/services/EquipmentItemsCalculation.js";
import {LanguageData} from "./src/services/LanguageData.js";
import {ConsumableItemsCalculation} from "./src/services/ConsumableItemsCalculation.js";
import {MaterialItemsCalculation} from "./src/services/MaterialItemsCalculation.js";
import {ItemStorage} from "./src/services/ItemStorage.js";
import {dummyItems} from "./src/services/dummyItems.js";
import {TelegramBot} from "./src/api/TelegramBot.js";
import {AppRouter} from './src/routes/index.js';

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const port = process.env.PORT || 4000;

const ITEMS_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';
const LOCALIZATION_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';
const GITHUB_API_URL = 'https://api.github.com/repos/ao-data/ao-bin-dumps/commits';
const CURRENT_SERVER_URL = 'https://albion-online-data-server.onrender.com/data';

const appVersion = process.env.APP_VERSION;
const tgToken = process.env.TELEGRAM_TOKEN;
const CHAT_ID = +process.env.CHAT_ID;
const TGBot = new TelegramBot({botToken: tgToken, chatId: CHAT_ID});

const languageData = new LanguageData();
const itemStorage = new ItemStorage();
const equipmentItemsCalculation = new EquipmentItemsCalculation();
const consumableItemsCalculation = new ConsumableItemsCalculation();
const materialItemsCalculation = new MaterialItemsCalculation();

const appRouter = new AppRouter(itemStorage);

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});
const logger = winston.createLogger({
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
})

const fetchItemNames = async () => {
    try {
        let response = await fetch(LOCALIZATION_URL);
        const data = await response.json();

        for (let item of data) {
            languageData.addLanguageItem(item);
        }
    } catch (err) {
        logger.error(`AOD github /master/formatted error: ${err}`);
    }
}

const fetchItems = async (itemsUrl) => {
    try {
        const response = await fetch(itemsUrl);
        return await response.json();
    } catch (err) {
        logger.error(`AOD github /master error: ${err}`);
    }
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchAODGithubReposData = async () => {
    try {
        const response = await fetch(GITHUB_API_URL, {
            method: "GET",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        const githubData = await response.json();
        return githubData[0]['commit']['author']['date'];
    } catch (err) {
        logger.error(`Github API error: ${err}`);
        return null;
    }
}

const app = express();

const fetchAllData = async (githubCommitDate) => {
    const [currentData] = await Promise.all([fetchItems(ITEMS_URL), fetchItemNames()]);

    if (currentData && Object.keys(languageData.data).length > 0) {
        const equipmentItemData = [
            ...currentData.items.weapon,
            ...currentData.items.equipmentitem,
        ]

        const items = JSON.parse(JSON.stringify(dummyItems));

        equipmentItemsCalculation.createItems(equipmentItemData, currentData.items.simpleitem, items);
        consumableItemsCalculation.createConsumableItems(currentData.items.consumableitem, items);
        materialItemsCalculation.createMaterialItems(currentData.items.simpleitem, items)
        items.language = {...items.language, ...languageData.data};
        items.githubCommitDate = githubCommitDate;
        items.appVersion = appVersion;

        await fs.writeFile('./data.txt', JSON.stringify(items))
            .then(() => logger.info('Data is refreshed/written'))
            .catch(err => logger.error(`Node JS file writing error: ${err}`));

    } else if (!currentData && Object.keys(languageData.data).length > 0) {
        throw new Error('NO_ITEMS_AND_NAMES_FETCHED');
    } else if (!currentData) {
        throw new Error('NO_ITEMS_FETCHED');
    } else {
        throw new Error('NO_NAMES_FETCHED');
    }
}

const startCycle = async (githubCommitDate) => {
    if (!githubCommitDate) {
        logger.info('No gitHub date fetched');
        return;
    }

    await fs.readFile('./data.txt', 'utf-8')
        .then((data) => {
            if (data) {
                itemStorage.currentData = {...JSON.parse(data)};
            }

            if (itemStorage.currentData.githubCommitDate !== githubCommitDate) {
                return fetchAllData(githubCommitDate)
                    .then(() => appRouter.resendDateInfo())
                    .then(() => startCycle(githubCommitDate))
                    .catch(err => logger.error(`catching fetchAllData error: ${err}`));
            } else {

                logger.info(`Albion Toolkit server data end-pont is ready`);

                const gitHubFetchInterval = setInterval(async () => {
                    const newGithubCommitDate = await fetchAODGithubReposData();

                    if (newGithubCommitDate !== githubCommitDate && newGithubCommitDate) {
                        clearInterval(gitHubFetchInterval);

                        logger.info(`Albion Online dumps in gitHub repository was updated`);

                        return startCycle(newGithubCommitDate)
                            .then(() => appRouter.resendDateInfo())
                            .catch(err => logger.error(`An error occurred in startCycle: ${err}`));
                    } else if (!newGithubCommitDate) {
                        logger.error(`No gitHub date fetched`);
                    } else {
                        logger.info(`AOD dumps date in gitHub repository is same`);
                    }
                }, 1800000)
            }
        })
        .catch(err => {
            if (err.code === 'ENOENT') {
                logger.error(`file missing, starting fetch items data: ${err}`);
                return fetchAllData(githubCommitDate)
                    .then(() => startCycle(githubCommitDate))
                    .catch(err => logger.error(`catching fetchAllData error: ${err}`));
            } else {
                logger.error(`catching file reading errors: ${err}`);
            }
        })
}

const githubCommitDate = await fetchAODGithubReposData();

if (githubCommitDate) {
    startCycle(githubCommitDate)
        .catch(err => logger.error(`An error occurred in startCycle: ${err}`));
} else {
    logger.error(`No gitHub date fetched`);
}

//для поддержания сервера активным
const fetchToWakeUpServer = async () => {
    try {
        let response = await fetch(CURRENT_SERVER_URL);
    } catch (err) {
        logger.error(`Albion Toolkit Server error: ${err}`);
    }

    const randomTime = Math.floor(Math.random() * 10000 + 40000);
    setTimeout(() => fetchToWakeUpServer(), randomTime);
}

fetchToWakeUpServer()
    .catch(err => logger.error(`Catching waking up fetches errors: ${err}`));

// const memoryUsage = process.memoryUsage();
// console.log(memoryUsage)

// 02.12.2024 убрал из классов хранение объектов
// {
//     rss: 62480384,
//     heapTotal: 37027840,
//     heapUsed: 22638216,
//     external: 4713253,
//     arrayBuffers: 431920
// }

app.use(appRouter.router);

app.listen(port, () => {
    logger.info(`Server started on port: ${port}`);
})
