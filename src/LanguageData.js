export class LanguageData {
    constructor() {
        this.data = new Map();

        //this.findItemNameHandler = this.findItemNameHandler.bind(this);
    }

    forbiddenTypes = ['UNIQUE_', 'SKIN_']

    addLanguageItem(item) {
        const itemId = item['UniqueName'];
        const translations = {
            ru: item?.["LocalizedNames"]?.["RU-RU"] || null,
            en: item?.["LocalizedNames"]?.["EN-US"] || null,
        }

        for (let forbiddenType of this.forbiddenTypes) {
            if (itemId.includes(forbiddenType)) return;
        }

        if (translations.en && translations.en) this.data.set(itemId, translations);
    }

    // createConsumableNames (AOTConsumableNames) {
    //     for (let itemId in AOTConsumableNames) {
    //         if (AOTConsumableNames[itemId] === null) {
    //             let translations = this.data.get(itemId);
    //
    //             AOTConsumableNames[itemId] = {...translations}
    //         }
    //     }
    // }

    // findItemNameHandler(id) {
    //     let translations = this.data.get(id);
    //     return {
    //         ru: translations.ru.split(' ').filter(str => str !== '(знаток)').join(' '),
    //         en: translations.en.split(' ').filter(str => str !== 'Adept\'s').join(' '),
    //     };
    // }
}