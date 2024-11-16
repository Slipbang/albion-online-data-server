import express from 'express';
import dataRouter from '../routes/appData.js';
import dateRouter from "./githubDumpsDate.js";

export class AppRouter {
    constructor(dataRef) {
        this.router = express.Router();
        this.clients = [];

        this.router.use('/date', dateRouter(dataRef, this.clients));
        this.router.use('/data', dataRouter(dataRef));
    }

    resendDateInfo() {
        if (this.clients.length) {
            this.clients.forEach((client) => {
                client.write(`UPLOAD_NEW_DATA\n\n`);
            });
        }
    }
}