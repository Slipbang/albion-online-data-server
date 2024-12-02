import {AppRouter} from "../../routes/index.js";
import {itemStorage} from "./itemStorageInstance.js";

export const appRouter = new AppRouter(itemStorage);