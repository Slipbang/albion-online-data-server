export class LanguageData {
    constructor() {
        this.data = new Map();

        this.findItemNameHandler = this.findItemNameHandler.bind(this);
    }

    addLanguageItem(item) {
        this.data.set(item['UniqueName'], item);
    }

    createConsumableNames (AOTConsumableNames) {
        for (let itemId in AOTConsumableNames) {
            if (AOTConsumableNames[itemId] === null) {
                let languageItem = this.data.get(itemId);

                AOTConsumableNames[itemId] = {
                    ru: languageItem["LocalizedNames"]["RU-RU"],
                    en: languageItem["LocalizedNames"]["EN-US"],
                }
            }
        }
    }

    findItemNameHandler(id) {
        let languageItem = this.data.get(id);

        return {
            ru: languageItem["LocalizedNames"]["RU-RU"].split(' ').filter(str => str !== '(знаток)').join(' '),
            en: languageItem["LocalizedNames"]["EN-US"].split(' ').filter(str => str !== 'Adept\'s').join(' '),
        };
    }
}