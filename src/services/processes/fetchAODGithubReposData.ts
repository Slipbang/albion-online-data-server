import fetch from "node-fetch";
import {existsSync} from "fs";
import {AppController} from "../../routes/index.ts";
import {TGithubApiTypes} from "../../types/githubApiTypes.ts";

if (existsSync('.env')) {
    const {config} = await import('dotenv');
    config();
}

const GITHUB_API_URL = 'https://api.github.com/repos/ao-data/ao-bin-dumps/commits';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const fetchAODGithubReposData = async function (this: AppController) {
    try {
        const response = await fetch(GITHUB_API_URL, {
            method: "GET",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json",
            },
        });
        const githubData = await response.json() as TGithubApiTypes;
        return githubData[0]['commit']['author']['date'];
    } catch (err) {
        console.error(`Github API error: ${err}`);
        return null;
    }
}