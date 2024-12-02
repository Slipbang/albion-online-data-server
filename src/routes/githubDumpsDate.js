import express from 'express';
import {DateController} from "../controllers/githubDumpsDate.js";
import cors from "cors";

const dateRouter = (itemStorage, clients) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DateController.getDate(req,res, itemStorage, clients));

    return router;
}

export default dateRouter;