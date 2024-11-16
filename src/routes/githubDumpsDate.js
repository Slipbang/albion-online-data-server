import express from 'express';
import {DateController} from "../controllers/githubDumpsDate.js";

const dateRouter = (currentDate, clients) => {
    const router = express.Router();

    router.get('/:date', (req, res) => DateController.getDate(req,res, currentDate, clients));

    return router;
}

export default dateRouter;