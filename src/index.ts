import express from 'express';
import {existsSync} from 'fs';
import {AppController} from "./routes/index.ts";

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

// 03.12.2024
// {
//     rss: 66084864,
//     heapTotal: 38076416,
//     heapUsed: 22029040,
//     external: 5003967,
//     arrayBuffers: 366383
// }


app.use(appController.router);

app.listen(port, () => {
    appController.logger.info(`Server started on port: ${port}`);
})
