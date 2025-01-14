import express from 'express';
import {DateController} from "../controllers/githubDumpsDate.js";
import cors from "cors";
import {SSEClients} from "./index.js";
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage.js";

const dateRouter = (itemStorage: ItemStorage, clients: SSEClients) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DateController.getDate(req, res, itemStorage, clients));

    return router;
}

export default dateRouter;