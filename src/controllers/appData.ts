import { Request, Response } from 'express';
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage.js";

export class DataController {
    static getData(req: Request, res: Response, itemStorage: ItemStorage) {

        try {
            res.status(200).json(itemStorage?.currentData);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: 'Internal Server Error', details: err.message });
            }
        }
    }
}
