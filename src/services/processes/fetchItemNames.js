import fetch from "node-fetch";

const LOCALIZATION_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';

export const fetchItemNames = async function () {
    try {
        let response = await fetch(LOCALIZATION_URL);
        const data = await response.json();

        for (let item of data) {
            this.languageData.addLanguageItem(item);
        }
    } catch (err) {
        this.logger.error(`AOD github /master/formatted error: ${err}`);
    }
}