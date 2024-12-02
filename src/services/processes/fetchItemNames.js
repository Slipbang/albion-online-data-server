import fetch from "node-fetch";
import {logger} from "../instances/loggerInstance.js";
import {languageData} from "../instances/languageDataInstance.js";

const LOCALIZATION_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';

export const fetchItemNames = async () => {
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