import express from 'express';
import {DateController} from "../controllers/githubDumpsDate.js";
import cors from "cors";

const dateRouter = (currentDate, clients) => {
    const router = express.Router();

    router.use(cors());
    router.get('/', (req, res) => DateController.getDate(req,res, currentDate, clients));

    return router;
}

export default dateRouter;