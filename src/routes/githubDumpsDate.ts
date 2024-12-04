import express from 'express';
import {DateController} from "../controllers/githubDumpsDate";
import cors from "cors";
import {SSEClients} from "./index";
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage";

const dateRouter = (itemStorage: ItemStorage, clients: SSEClients) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DateController.getDate(req, res, itemStorage, clients));

    return router;
}

export default dateRouter;