import fetch from "node-fetch";
import {ArtefactItems} from "./src/ArtefactItems.js";
import {EquipmentItems} from "./src/EquipmentItems.js";
import {LanguageData} from "./src/LanguageData.js";
import {ConsumableItems} from "./src/ConsumableItems.js";
import express from 'express';
import {MaterialItems} from "./src/MaterialItems.js";
import cors from 'cors';
import * as path from "path";
import {fileURLToPath} from 'url';
import {Data} from "./src/Data.js";
import {items} from "./src/items.js";
import {startBot} from "./src/TelegramBot.js";
import TelegramApi from 'node-telegram-bot-api';

const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let itemsUrl = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';
let localizationUrl = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';
const githubApiUrl = 'https://api.github.com/repos/ao-data/ao-bin-dumps/commits';

const equipmentCategories = [
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

const consumableCategories = ['potion', 'cooked'];
const materialCategories = ['metalbar', 'leather', 'cloth', 'planks', 'stoneblock', 'ore', 'wood', 'hide', 'fiber', 'rock'];

const tgToken = process.env.TELEGRAM_TOKEN || '7549638739:AAEuAWtQq9w7q5EWR_quberO14qD2EBNcrk';
const tgBot = new TelegramApi(tgToken, {polling: true});

startBot(tgBot);

let itemData = {};
let githubCommitDate = '';
const languageData = new LanguageData();
const node = new Data();

const fetchItemNames = async () => {
    let response = await fetch(localizationUrl);

    if (response.ok) {
        const data = await response.json();

        for (let item of data) {
            languageData.addLanguageItem(item)
        }
    } else {
        console.log('AOD github /master/formatted status: ' + response.status)
    }
}

const fetchItems = async () => {
    const response = await fetch(itemsUrl);

    if (response.ok) {
        itemData = await response.json();
    } else {
        console.log('AOD github /master status: ' + response.status)
    }
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchAODGithubReposData = async () => {
    const response = await fetch(githubApiUrl, {
        method: "GET",
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const githubData = await response.json();
        githubCommitDate = githubData[0]['commit']['author']['date'];
    } else {
        console.log('Github API status: ' + response.status)
    }
}

const app = express();

const fetchAllData = () =>
    fetchItemNames()
        .then(() => fetchItems())
        .then(() => {
            const equipmentItemData = [
                ...itemData.items.weapon,
                ...itemData.items.equipmentitem,
            ]
            const artefactItems = new ArtefactItems(itemData.items.simpleitem);
            const equipmentItems = new EquipmentItems(equipmentItemData);
            const consumableItems = new ConsumableItems(itemData.items.consumableitem);
            const materialItems = new MaterialItems(itemData.items.simpleitem);

            equipmentItems.createItems(equipmentCategories, items, artefactItems.createArtefactItem_Obj_Handler);
            consumableItems.createConsumableItems(consumableCategories, items);
            materialItems.createMaterialItems(materialCategories, items)
            items.language = {...items.language, ...languageData.data};
            items.date = githubCommitDate;
        })
        .finally(async () => {
            await node.writeNewData(path.resolve(__dirname, 'data.txt'), items);
            console.log('Data is refreshed/written');
        })


const startCycle = () =>
    fetchAODGithubReposData()
        .then(() => {
            node.readCurrentData(path.resolve(__dirname, 'data.txt'))
                .then((data) => {
                    if (data) {
                        node.currentData = {...JSON.parse(data)};
                    }

                    if (node.currentData.date !== githubCommitDate) {
                        fetchAllData()
                            .then(() => startCycle())
                    } else {
                        app.get('/data', (req, res) => {
                            res.json(node.currentData);
                        });
                        console.log('data end-pont is ready')
                        setTimeout(() => startCycle(), 259200000);
                    }
                })
                .catch(err => {
                    if (err.code === 'ENOENT') {
                        fetchAllData()
                            .then(() => startCycle())
                    } else {
                        console.log(err)
                    }
                })
        })
        .catch(err => console.error(err));

startCycle()
    .catch(err => console.log(err));

const serverUrl = 'https://albion-online-data-server.onrender.com/data'

const fetchToWakeUpServer = async () => {
    let response = await fetch(serverUrl);

    if (response.ok) {
        console.log('awaking server')
    } else {
        console.log('server status: ' + response.status)
    }

    const randomTime = Math.floor(Math.random() * 10000 + 40000);

    setTimeout(() => fetchToWakeUpServer(), randomTime)
}

fetchToWakeUpServer()
    .catch(err => console.log(err))

app.use(cors())

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})
