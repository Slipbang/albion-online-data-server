import express from 'express';
import {existsSync} from 'fs';
import {AppController} from "./routes/index.js";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const port = process.env.PORT || 4000;
const aaa = ''

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

app.use(appController.router);

app.listen(port, () => {
    appController.logger.info(`Server started on port: ${port}`);
})
