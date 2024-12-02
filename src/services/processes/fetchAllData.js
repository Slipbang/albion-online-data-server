import {dummyItems} from "../dummyItems.js";
import fs from "fs/promises";
import {EquipmentItemsCreation} from "../ConfigurationClasses/EquipmentItemsCreation.js";
import {ConsumableItemsCreation} from "../ConfigurationClasses/ConsumableItemsCreation.js";
import {MaterialItemsCreation} from "../ConfigurationClasses/MaterialItemsCreation.js";
import {existsSync} from "fs";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const ITEMS_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';
const appVersion = process.env.APP_VERSION;

export const fetchAllData = async function (githubCommitDate) {
    const [receivedData] = await Promise.all([this.fetchItems(ITEMS_URL), this.fetchItemNames()]);

    if (receivedData && Object.keys(this.languageData.data).length > 0) {
        const equipmentItemData = [
            ...receivedData.items.weapon,
            ...receivedData.items.equipmentitem,
        ]

        const items = JSON.parse(JSON.stringify(dummyItems));

        const equipmentItemsCreation = new EquipmentItemsCreation();
        const consumableItemsCreation = new ConsumableItemsCreation();
        const materialItemsCreation = new MaterialItemsCreation();

        equipmentItemsCreation.createItems(equipmentItemData, receivedData.items.simpleitem, items);
        consumableItemsCreation.createConsumableItems(receivedData.items.consumableitem, items);
        materialItemsCreation.createMaterialItems(receivedData.items.simpleitem, items)
        items.language = {...items.language, ...this.languageData.data};
        items.githubCommitDate = githubCommitDate;
        items.appVersion = appVersion;

        await fs.writeFile('./data.txt', JSON.stringify(items))
            .then(() => this.logger.info('Data is refreshed/written'))
            .catch(err => this.logger.error(`Node JS file writing error: ${err}`));

    } else if (!receivedData && Object.keys(this.languageData.data).length > 0) {
        throw new Error('NO_ITEMS_AND_NAMES_FETCHED');
    } else if (!receivedData) {
        throw new Error('NO_ITEMS_FETCHED');
    } else {
        throw new Error('NO_NAMES_FETCHED');
    }
}