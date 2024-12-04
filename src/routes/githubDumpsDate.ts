import express from 'express';
import {DateController} from "../controllers/githubDumpsDate.ts";
import cors from "cors";
import {SSEClients} from "./index";
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage.ts";

const dateRouter = (itemStorage: ItemStorage, clients: SSEClients) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DateController.getDate(req, res, itemStorage, clients));

    return router;
}

export default dateRouter;