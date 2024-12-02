import fetch from "node-fetch";
import {logger} from "../instances/loggerInstance.js";

const GITHUB_API_URL = 'https://api.github.com/repos/ao-data/ao-bin-dumps/commits';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const fetchAODGithubReposData = async () => {
    try {
        const response = await fetch(GITHUB_API_URL, {
            method: "GET",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        const githubData = await response.json();
        return githubData[0]['commit']['author']['date'];
    } catch (err) {
        logger.error(`Github API error: ${err}`);
        return null;
    }
}