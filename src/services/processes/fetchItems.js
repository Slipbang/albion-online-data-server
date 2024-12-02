import fetch from "node-fetch";
// import {logger} from "../instances/loggerInstance.js";

export const fetchItems = async function (itemsUrl) {
    try {
        const response = await fetch(itemsUrl);
        return await response.json();
    } catch (err) {
        this.logger.error(`AOD github /master error: ${err}`);
    }
}