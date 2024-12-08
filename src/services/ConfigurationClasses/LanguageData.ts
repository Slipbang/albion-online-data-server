import {TLocalizedNames} from "../../types/AODPLanguage.js";

type TMainLanguages = 'ru' | 'en';

type TLanguageData = {
    [key: string]: {
        [key in TMainLanguages]: string | null;
    }
}

export class LanguageData {
    public data: TLanguageData;

    constructor() {
        this.data = {};
    }

    forbiddenTypes = ['UNIQUE_', 'SKIN_', 'PLAYERISLAND_', 'QUESTITEM_', '_LOOTBAG_', '_FIREWORKS_', 'TREASURE_', '_KILL_'];

    addLanguageItem(item: TLocalizedNames) {
        const itemId = item['UniqueName'];
        const translations = {
            ru: item?.["LocalizedNames"]?.["RU-RU"] || null,
            en: item?.["LocalizedNames"]?.["EN-US"] || null,
        }

        for (let forbiddenType of this.forbiddenTypes) {
            if (itemId.includes(forbiddenType)) return;
        }

        if (translations.en && translations.en) this.data[itemId] = {...translations};
    }
}