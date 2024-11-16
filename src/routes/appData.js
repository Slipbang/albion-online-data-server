import express from 'express';
import {DataController} from "../controllers/appData.js";

const dataRouter = (dataInstance) => {
    const router = express.Router();

    router.get('/', (req, res) => DataController.getData(req, res, dataInstance));

    return router;
}


export default dataRouter;

