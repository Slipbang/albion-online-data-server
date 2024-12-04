import fetch from "node-fetch";
import {AppController} from "../../routes/index.ts";

const CURRENT_SERVER_URL = 'https://albion-online-data-server.onrender.com/data';

export const fetchToWakeUpServer = async function (this: AppController) {
    try {
        let response = await fetch(CURRENT_SERVER_URL);
    } catch (err) {
        this.logger.error(`Albion Toolkit Server error: ${err}`);
    }

    const randomTime = Math.floor(Math.random() * 10000 + 40000);
    setTimeout(() => this.fetchToWakeUpServer(), randomTime);
}