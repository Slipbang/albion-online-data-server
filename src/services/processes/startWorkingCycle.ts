import fs from "fs/promises";
import {AppController} from "../../routes/index.js";

export const startWorkingCycle = async function (this: AppController, githubCommitDate: string,) {
    if (!githubCommitDate) {
        this.logger.info('No gitHub date fetched');
        return;
    }

    await fs.readFile('./data.txt', 'utf-8')
        .then((data) => {
            if (data) {
                this.itemStorage.currentData = {...JSON.parse(data)};
            }

            if (this.itemStorage.currentData.githubCommitDate !== githubCommitDate) {
                return this.fetchAllData(githubCommitDate)
                    .then(() => this.resendDateInfo())
                    .then(() => this.startWorkingCycle(githubCommitDate))
                    .catch(err => this.logger.error(`catching fetchAllData error: ${err}`));
            } else {
                this.logger.info(`Albion Toolkit server data end-pont is ready`);

                const gitHubFetchInterval = setInterval(async () => {
                    const newGithubCommitDate = await this.fetchAODGithubReposData();

                    if (newGithubCommitDate !== githubCommitDate && newGithubCommitDate) {
                        clearInterval(gitHubFetchInterval);

                        this.logger.info(`Albion Online dumps in gitHub repository was updated`);

                        return this.startWorkingCycle(newGithubCommitDate)
                            .then(() => this.resendDateInfo())
                            .catch(err => this.logger.error(`An error occurred in startWorkingCycle: ${err}`));
                    } else if (!newGithubCommitDate) {
                        this.logger.error(`No gitHub date fetched`);
                    } else {
                        this.logger.info(`AOD dumps date in gitHub repository is same`);
                    }
                }, 1800000)
            }
        })
        .catch(err => {
            if (err.code === 'ENOENT') {
                this.logger.error(`file missing, starting fetch items data: ${err}`);
                return this.fetchAllData(githubCommitDate)
                    .then(() => this.startWorkingCycle(githubCommitDate))
                    .catch(err => this.logger.error(`catching fetchAllData error: ${err}`));
            } else {
                this.logger.error(`catching file reading errors: ${err}`);
            }
        })
}