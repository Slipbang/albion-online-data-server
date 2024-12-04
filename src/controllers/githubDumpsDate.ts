import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage.js";
import { Response, Request } from 'express';
import {SSEClients} from "../routes/index.js";

export class DateController {
    static getDate(req: Request, res: Response, itemStorage: ItemStorage, clients: SSEClients) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        clients.push(res);

        const versionMeta = {
            githubCommitDate: itemStorage.currentData.githubCommitDate,
            appVersion: itemStorage.currentData.appVersion,
        }

        res.write(`data: ${JSON.stringify(versionMeta)}\n\n`);

        req.on('close', () => {
            clients.splice(clients.indexOf(res), 1);
        });
    }
}