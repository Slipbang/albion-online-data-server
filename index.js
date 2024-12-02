import express from 'express';
import {existsSync} from 'fs';
import {AppController} from "./src/routes/index.js";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const port = process.env.PORT || 4000;

const appController = new AppController();
const app = express();

const githubCommitDate = await appController.fetchAODGithubReposData();

if (githubCommitDate) {
    appController.startWorkingCycle(githubCommitDate)
        .catch(err => appController.logger.error(`An error occurred in startWorkingCycle: ${err}`));
} else {
    appController.logger.error(`No gitHub date fetched`);
}

appController.fetchToWakeUpServer()
    .catch(err => appController.logger.error(`Catching waking up fetches errors: ${err}`));

// const memoryUsage = process.memoryUsage();
// console.log(memoryUsage)

// 02.12.2024 убрал из конфиг классов хранение объектов
// {
//     rss: 62480384,
//     heapTotal: 37027840,
//     heapUsed: 22638216,
//     external: 4713253,
//     arrayBuffers: 431920
// }

app.use(appController.router);

app.listen(port, () => {
    appController.logger.info(`Server started on port: ${port}`);
})
