import express from 'express';
import cors from "cors";

import path from "path";
import { fileURLToPath } from 'url';
import {AlbionToolkit} from "../controllers/albionToolkit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '../../', 'public_albionToolkit');
const router = express.Router();

router.use(express.static(publicPath));
router.use("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});
router.get('/', (req, res) => AlbionToolkit.getAlbionToolkit(req, res, publicPath));
router.use(cors());

export default router;