export class LanguageData {
    constructor() {
        this.data = new Map();
    }

    forbiddenTypes = ['UNIQUE_', 'SKIN_', 'PLAYERISLAND_', 'QUESTITEM_', '_LOOTBAG_', '_FIREWORKS_', 'TREASURE_']

    addLanguageItem(item) {
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