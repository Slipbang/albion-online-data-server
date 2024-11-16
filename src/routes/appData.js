import express from 'express';
import {DataController} from "../controllers/appData.js";
import cors from 'cors';

const dataRouter = (dataInstance) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DataController.getData(req, res, dataInstance));

    return router;
}


export default dataRouter;

