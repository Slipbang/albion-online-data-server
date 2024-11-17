import express from 'express';
import dataRouter from '../routes/appData.js';
import dateRouter from "./githubDumpsDate.js";
import manualRouter from "./manualRouter.js";

export class AppRouter {
    constructor(dataRef) {
        this.router = express.Router();
        this.clients = [];

        this.data = dataRef;
        this.router.use('/date', dateRouter(this.data, this.clients));
        this.router.use('/data', dataRouter(this.data));
        this.router.use('/webdevmanual', manualRouter);
    }

    resendDateInfo() {
        if (this.clients.length) {
            this.clients.forEach((client) => {
                client.write(`data: ${this.data.currentData.date}\n\n`);
            });
        }
    }
}