type TLanguages = 'RU-RU' | 'EN-US'

export type TLocalizedNames = {
    "UniqueName": string;
    "LocalizedNames": {
        [key in TLanguages]: string;
    }
}

export type TaodLanguage = TLocalizedNames[];