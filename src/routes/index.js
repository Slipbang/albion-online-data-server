import express from 'express';
import winston from "winston";

import manualRouter from "./manualWebdev.js";
import dataRouter from './appData.js';
import dateRouter from "./githubDumpsDate.js";
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage.js";
import {startWorkingCycle} from "../services/processes/startWorkingCycle.js";
import {fetchAllData} from "../services/processes/fetchAllData.js";
import {fetchItems} from "../services/processes/fetchItems.js";
import {fetchItemNames} from "../services/processes/fetchItemNames.js";
import {fetchAODGithubReposData} from "../services/processes/fetchAODGithubReposData.js";
import {fetchToWakeUpServer} from "../services/processes/fetchToWakeUpServer.js";

import {LanguageData} from "../services/ConfigurationClasses/LanguageData.js";
import {winstonConfiguration} from "../services/tgBot_winstonConfig/winstonConfiguration.js";

export class AppController {
    constructor() {
        this.router = express.Router();
        this.logger = winston.createLogger(winstonConfiguration);
        this.itemStorage = new ItemStorage();
        this.languageData = new LanguageData();
        this.clients = [];

        this.router.use('/ctrlinfo', dateRouter(this.itemStorage, this.clients));
        this.router.use('/data', dataRouter(this.itemStorage));
        this.router.use('/webdevmanual', manualRouter);
    }

    resendDateInfo() {
        if (this.clients.length) {
            this.clients.forEach((client) => {
                client.write(`data: ${this.itemStorage.currentData.date}\n\n`);
            });
        }
    }

    fetchAODGithubReposData = fetchAODGithubReposData;
    fetchItemNames = fetchItemNames;
    fetchItems = fetchItems;
    startWorkingCycle = startWorkingCycle;
    fetchAllData = fetchAllData;
    fetchToWakeUpServer = fetchToWakeUpServer;
}