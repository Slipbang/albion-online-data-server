import express from 'express';
import {DataController} from "../controllers/appData";
import cors from 'cors';
import {ItemStorage} from "../services/ConfigurationClasses/ItemStorage";

const dataRouter = (itemStorage: ItemStorage) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DataController.getData(req, res, itemStorage));

    return router;
}


export default dataRouter;

