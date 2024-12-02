import express from 'express';
import {existsSync} from 'fs';
import {logger} from "./src/services/instances/loggerInstance.js";
import {fetchAODGithubReposData} from "./src/services/processes/fetchAODGithubReposData.js";
import {startWorkingCycle} from "./src/services/processes/startWorkingCycle.js";
import {fetchToWakeUpServer} from "./src/services/processes/fetchToWakeUpServer.js";
import {appRouter} from "./src/services/instances/appRouterInstance.js";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const port = process.env.PORT || 4000;

const app = express();

const githubCommitDate = await fetchAODGithubReposData();

if (githubCommitDate) {
    startWorkingCycle(githubCommitDate)
        .catch(err => logger.error(`An error occurred in startWorkingCycle: ${err}`));
} else {
    logger.error(`No gitHub date fetched`);
}

fetchToWakeUpServer()
    .catch(err => logger.error(`Catching waking up fetches errors: ${err}`));

// const memoryUsage = process.memoryUsage();
// console.log(memoryUsage)

// 02.12.2024 убрал из классов хранение объектов
// {
//     rss: 62480384,
//     heapTotal: 37027840,
//     heapUsed: 22638216,
//     external: 4713253,
//     arrayBuffers: 431920
// }

app.use(appRouter.router);

app.listen(port, () => {
    logger.info(`Server started on port: ${port}`);
})
