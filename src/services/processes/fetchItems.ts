import fetch from "node-fetch";
import {AppController} from "../../routes/index.ts";

export const fetchItems = async function (this: AppController, itemsUrl: string) {
    try {
        const response = await fetch(itemsUrl);
        return await response.json();
    } catch (err) {
        this.logger.error(`AOD github /master error: ${err}`);
    }
}