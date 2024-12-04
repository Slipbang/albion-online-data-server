import fetch from "node-fetch";
import {AppController} from "../../routes/index.ts";
import {TaodLanguage} from "../../types/AODPLanguage.ts";

const LOCALIZATION_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';

export const fetchItemNames = async function (this: AppController) {
    try {
        let response = await fetch(LOCALIZATION_URL);
        const data = await response.json() as TaodLanguage;

        for (let item of data) {
            this.languageData.addLanguageItem(item);
        }
    } catch (err) {
        this.logger.error(`AOD github /master/formatted error: ${err}`);
    }
}