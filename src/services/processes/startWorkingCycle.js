import {logger} from "../instances/loggerInstance.js";
import fs from "fs/promises";
import {fetchAODGithubReposData} from "./fetchAODGithubReposData.js";
import {fetchAllData} from "./fetchAllData.js";
import {itemStorage} from "../instances/itemStorageInstance.js";
import {appRouter} from "../instances/appRouterInstance.js";

export const startWorkingCycle = async (githubCommitDate) => {
    if (!githubCommitDate) {
        logger.info('No gitHub date fetched');
        return;
    }

    await fs.readFile('./data.txt', 'utf-8')
        .then((data) => {
            if (data) {
                itemStorage.currentData = {...JSON.parse(data)};
            }

            if (itemStorage.currentData.githubCommitDate !== githubCommitDate) {
                return fetchAllData(githubCommitDate)
                    .then(() => appRouter.resendDateInfo())
                    .then(() => startWorkingCycle(githubCommitDate))
                    .catch(err => logger.error(`catching fetchAllData error: ${err}`));
            } else {

                logger.info(`Albion Toolkit server data end-pont is ready`);

                const gitHubFetchInterval = setInterval(async () => {
                    const newGithubCommitDate = await fetchAODGithubReposData();

                    if (newGithubCommitDate !== githubCommitDate && newGithubCommitDate) {
                        clearInterval(gitHubFetchInterval);

                        logger.info(`Albion Online dumps in gitHub repository was updated`);

                        return startWorkingCycle(newGithubCommitDate)
                            .then(() => appRouter.resendDateInfo())
                            .catch(err => logger.error(`An error occurred in startWorkingCycle: ${err}`));
                    } else if (!newGithubCommitDate) {
                        logger.error(`No gitHub date fetched`);
                    } else {
                        logger.info(`AOD dumps date in gitHub repository is same`);
                    }
                }, 1800000)
            }
        })
        .catch(err => {
            if (err.code === 'ENOENT') {
                logger.error(`file missing, starting fetch items data: ${err}`);
                return fetchAllData(githubCommitDate)
                    .then(() => startWorkingCycle(githubCommitDate))
                    .catch(err => logger.error(`catching fetchAllData error: ${err}`));
            } else {
                logger.error(`catching file reading errors: ${err}`);
            }
        })
}