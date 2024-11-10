import fetch from "node-fetch";
import {ArtefactItems} from "./src/ArtefactItems.js";
import {EquipmentItems} from "./src/EquipmentItems.js";
import {LanguageData} from "./src/LanguageData.js";
import {ConsumableItems} from "./src/ConsumableItems.js";
import express from 'express';
import {MaterialItems} from "./src/MaterialItems.js";
import cors from 'cors';
import {Data} from "./src/Data.js";
import {items} from "./src/items.js";
import {TGBot} from "./src/TelegramBot.js";
import winston from "winston";

const port = process.env.PORT || 4000;

const ITEMS_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';
const LOCALIZATION_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';
const GITHUB_API_URL = 'https://api.github.com/repos/ao-data/ao-bin-dumps/commits';
const CURRENT_SERVER_URL = 'https://albion-online-data-server.onrender.com/data';

const EQUIPMENT_CATEGORIES = [
    'demolitionhammer', 'pickaxe', 'sickle', 'skinningknife', 'stonehammer',
    'woodaxe', 'fishing', 'bow', 'crossbow', 'cursestaff', 'firestaff', 'froststaff',
    'arcanestaff', 'holystaff', 'naturestaff', 'dagger', 'spear',
    'axe', 'sword', 'quarterstaff', 'hammer', 'mace', 'knuckles',
    'cape', 'bag', 'torch', 'totem', 'book',
    'orb', 'shield', 'cloth_helmet', 'cloth_armor', 'cloth_shoes',
    'leather_helmet', 'leather_armor', 'leather_shoes', 'plate_helmet',
    'plate_armor', 'plate_shoes',
    'fibergatherer_helmet', 'fibergatherer_armor', 'fibergatherer_shoes',
    'fishgatherer_helmet', 'fishgatherer_armor', 'fishgatherer_shoes',
    'hidegatherer_helmet', 'hidegatherer_armor', 'hidegatherer_shoes',
    'oregatherer_helmet', 'oregatherer_armor', 'oregatherer_shoes',
    'rockgatherer_helmet', 'rockgatherer_armor', 'rockgatherer_shoes',
    'woodgatherer_helmet', 'woodgatherer_armor', 'woodgatherer_shoes'];

const CONSUMABLE_CATEGORIES = ['potion', 'cooked'];
const MATERIAL_CATEGORIES = ['metalbar', 'leather', 'cloth', 'planks', 'stoneblock', 'ore', 'wood', 'hide', 'fiber', 'rock'];

const tgToken = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const newTGBot = new TGBot({botToken: tgToken, chatId: CHAT_ID});

const languageData = new LanguageData();
const node = new Data();

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
        newTGBot,
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
    const [itemData] = await Promise.all([fetchItems(ITEMS_URL), fetchItemNames()]);

    if (itemData && Object.keys(languageData.data).length > 0) {
        const equipmentItemData = [
            ...itemData.items.weapon,
            ...itemData.items.equipmentitem,
        ]
        const artefactItems = new ArtefactItems(itemData.items.simpleitem);
        const equipmentItems = new EquipmentItems(equipmentItemData);
        const consumableItems = new ConsumableItems(itemData.items.consumableitem);
        const materialItems = new MaterialItems(itemData.items.simpleitem);

        equipmentItems.createItems(EQUIPMENT_CATEGORIES, items, artefactItems.createArtefactItem_Obj_Handler);
        consumableItems.createConsumableItems(CONSUMABLE_CATEGORIES, items);
        materialItems.createMaterialItems(MATERIAL_CATEGORIES, items)
        items.language = {...items.language, ...languageData.data};
        items.date = githubCommitDate;

        await node.writeNewData('./data.txt', items, logger);

    } else if (!itemData && Object.keys(languageData.data).length > 0) {
        throw new Error('NO_ITEMS_AND_NAMES_FETCHED');
    } else if (!itemData) {
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

    await node.readCurrentData('./data.txt')
        .then((data) => {
            if (data) {
                node.currentData = {...JSON.parse(data)};
            }

            if (node.currentData.date !== githubCommitDate) {
                return fetchAllData(githubCommitDate)
                    .then(() => startCycle(githubCommitDate))
                    .catch(err => logger.error(`catching fetchAllData error: ${err}`));
            } else {
                app.get('/data', (req, res) => {
                    res.json(node.currentData);
                });
                logger.info(`Albion Toolkit server data end-pont is ready`);

                const gitHubFetchInterval = setInterval(async () => {
                    const newGithubCommitDate = await fetchAODGithubReposData();

                    if (newGithubCommitDate !== githubCommitDate && newGithubCommitDate) {
                        clearInterval(gitHubFetchInterval);

                        logger.info(`Albion Online dumps in gitHub repository was updated`);

                        return startCycle(newGithubCommitDate)
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


app.use(cors())

app.listen(port, () => {
    logger.info(`Server started on port: ${port}`);
})
