import express, {Router, Response} from 'express';
import winston from "winston";

import manualRouter from "./manualWebdev";
import dataRouter from './appData.ts';
import dateRouter from "./githubDumpsDate";
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage";
import {startWorkingCycle} from "../services/processes/startWorkingCycle";
import {fetchAllData} from "../services/processes/fetchAllData";
import {fetchItems} from "../services/processes/fetchItems";
import {fetchItemNames} from "../services/processes/fetchItemNames";
import {fetchAODGithubReposData} from "../services/processes/fetchAODGithubReposData";
import {fetchToWakeUpServer} from "../services/processes/fetchToWakeUpServer";

import {LanguageData} from "../services/ConfigurationClasses/LanguageData";
import {winstonConfiguration} from "../services/tgBot_winstonConfig/winstonConfiguration";

export type SSEClients = Response[];

export class AppController {
    public router: Router;
    public logger: winston.Logger;
    public itemStorage: ItemStorage;
    public languageData: LanguageData;
    protected clients: SSEClients;

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
                const versionMeta = {
                    githubCommitDate: this.itemStorage.currentData.githubCommitDate,
                    appVersion: this.itemStorage.currentData.appVersion,
                }
                client.write(`data: ${JSON.stringify(versionMeta)}\n\n`);
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