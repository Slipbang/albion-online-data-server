interface IGithubData {
    commit: {
        author: {
            date: string;
        }
    }
}

export type TGithubApiTypes = IGithubData[];