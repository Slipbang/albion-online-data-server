import {dummyItems} from "../dummyItems.js";
import fs from "fs/promises";
import {EquipmentItemsCreation} from "../ConfigurationClasses/EquipmentItemsCreation.js";
import {ConsumableItemsCreation} from "../ConfigurationClasses/ConsumableItemsCreation.js";
import {MaterialItemsCreation} from "../ConfigurationClasses/MaterialItemsCreation.js";
import {logger} from "../instances/loggerInstance.js";
import {languageData} from "../instances/languageDataInstance.js";
import {fetchItems} from "./fetchItems.js";
import {fetchItemNames} from "./fetchItemNames.js";

const ITEMS_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';

export const fetchAllData = async (githubCommitDate) => {
    const [receivedData] = await Promise.all([fetchItems(ITEMS_URL), fetchItemNames()]);

    if (receivedData && Object.keys(languageData.data).length > 0) {
        const equipmentItemData = [
            ...receivedData.items.weapon,
            ...receivedData.items.equipmentitem,
        ]

        const items = JSON.parse(JSON.stringify(dummyItems));

        const appVersion = process.env.APP_VERSION;
        const equipmentItemsCreation = new EquipmentItemsCreation();
        const consumableItemsCreation = new ConsumableItemsCreation();
        const materialItemsCreation = new MaterialItemsCreation();

        equipmentItemsCreation.createItems(equipmentItemData, receivedData.items.simpleitem, items);
        consumableItemsCreation.createConsumableItems(receivedData.items.consumableitem, items);
        materialItemsCreation.createMaterialItems(receivedData.items.simpleitem, items)
        items.language = {...items.language, ...languageData.data};
        items.githubCommitDate = githubCommitDate;
        items.appVersion = appVersion;

        await fs.writeFile('./data.txt', JSON.stringify(items))
            .then(() => logger.info('Data is refreshed/written'))
            .catch(err => logger.error(`Node JS file writing error: ${err}`));

    } else if (!receivedData && Object.keys(languageData.data).length > 0) {
        throw new Error('NO_ITEMS_AND_NAMES_FETCHED');
    } else if (!receivedData) {
        throw new Error('NO_ITEMS_FETCHED');
    } else {
        throw new Error('NO_NAMES_FETCHED');
    }
}