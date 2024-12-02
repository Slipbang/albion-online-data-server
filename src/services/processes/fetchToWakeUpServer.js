import fetch from "node-fetch";
import {logger} from "../instances/loggerInstance.js";

const CURRENT_SERVER_URL = 'https://albion-online-data-server.onrender.com/data';

export const fetchToWakeUpServer = async () => {
    try {
        let response = await fetch(CURRENT_SERVER_URL);
    } catch (err) {
        logger.error(`Albion Toolkit Server error: ${err}`);
    }

    const randomTime = Math.floor(Math.random() * 10000 + 40000);
    setTimeout(() => fetchToWakeUpServer(), randomTime);
}