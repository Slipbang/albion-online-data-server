import fetch from "node-fetch";
import {ArtefactItems} from "./src/ArtefactItems.js";
import {EquipmentItems} from "./src/EquipmentItems.js";
import {LanguageData} from "./src/LanguageData.js";
import {ConsumableItems} from "./src/ConsumableItems.js";
import express from 'express';
import {MaterialItems} from "./src/MaterialItems.js";
import cors from 'cors';
const port = process.env.PORT || 4000;

// import * as fs from "fs";
// import * as path from "path";
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

let itemsUrl = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';
let localizationUrl = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';

const items = {
    craftItems: {
        "MAIN": [],
        "2H": [],
        "BAG": [],
        "CAPE": [],
        "ARMOR": [],
        "HEAD": [],
        "SHOES": [],
        "OFF": [],
    },
    consumableCraftItems: {
        'potion': [],
        'cooked': [],
    },
    artefacts: {
        WARRIOR: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        },
        MAGE: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        },
        HUNTER: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        }
    },
    materials: [],
    language: [
        [
            'T1_ALCHEMY_EXTRACT_LEVEL',
            {
                ru: 'Магические экстракты',
                en: 'Arcane Extracts',
            }
        ],
        ['T1_FISHSAUCE_LEVEL',
            {
                ru: 'Рыбные соусы',
                en: 'Fish Sauces',
            },
        ]
    ],
}

const weaponCategories = [
    'demolitionhammer', 'pickaxe', 'sickle', 'skinningknife', 'stonehammer',
    'woodaxe', 'fishing', 'bow', 'crossbow', 'cursestaff', 'firestaff', 'froststaff',
    'arcanestaff', 'holystaff', 'naturestaff', 'dagger', 'spear',
    'axe', 'sword', 'quarterstaff', 'hammer', 'mace', 'knuckles'
]

const equipmentCategories = ['cape', 'bag', 'torch', 'totem', 'book',
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

let itemData = {};
const languageData = new LanguageData();

const fetchItemNames = async () => {
    let response = await fetch(localizationUrl);

    if (response.ok) {
        const data = await response.json();

        for (let item of data) {
            languageData.addLanguageItem(item)
        }
    } else {
        console.log(response.status)
        throw new Error('');
    }
}

const fetchItems = async () => {
    let response = await fetch(itemsUrl);

    if (response.ok) {
        itemData = await response.json();
    } else {
        console.log(response.status)
        throw new Error('');
    }
}

const app = express();

const fetchAllData = () => fetchItemNames()
    .then(() => fetchItems())
    .then(() => {
        const artefactItems = new ArtefactItems(itemData.items.simpleitem);
        const equipmentItems = new EquipmentItems(itemData.items.equipmentitem);
        const weaponItems = new EquipmentItems(itemData.items.weapon);
        const consumableItems = new ConsumableItems(itemData.items.consumableitem);
        const materialItems = new MaterialItems(itemData.items.simpleitem);
        weaponItems.createItems(weaponCategories, items, artefactItems.createArtefactItem_Obj_Handler);
        equipmentItems.createItems(equipmentCategories, items, artefactItems.createArtefactItem_Obj_Handler);
        consumableItems.createConsumableItems(consumableCategories, items);
        materialItems.createMaterialItems(materialCategories, items)
        items.language = [...items.language, ...languageData.data.entries()];

        app.get('/data', (req, res) => {
            res.json(items);
        });

    }).finally(() => {
        console.log('Data is refreshed');
        // fs.writeFile(path.resolve(__dirname, 'data.js'), JSON.stringify(items), (err) => {
        //     if (err) throw err;
        // })
    })

fetchAllData()
    .then(() => setInterval(() => fetchAllData(), 259200000));

app.use(cors())

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})
