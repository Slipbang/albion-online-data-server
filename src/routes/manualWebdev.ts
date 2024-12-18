import express from 'express';
import cors from "cors";
import {ManualWebdev} from "../controllers/manualWebdev.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '../../', 'public_webdevManual');
const router = express.Router();

router.use(express.static(publicPath));
router.get('/', (req, res) => ManualWebdev.getManual(req, res, publicPath));
router.use(cors());

export default router;