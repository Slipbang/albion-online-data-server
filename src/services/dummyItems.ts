export type TCraftItemsTypes = "MAIN" | "2H" | "BAG" | "CAPE" | "ARMOR" | "HEAD" | "SHOES" | "OFF";
export type TResourceType = 'METALBAR' | 'LEATHER' | 'CLOTH' | 'PLANKS' | 'STONEBLOCK' | 'ORE' | 'WOOD' | 'HIDE' | 'FIBER' | 'ROCK';

export type TCraftItem = {
    itemId: string;
    itemNode: string;
    foodConsumption: number
    itemType: string;
    itemClass: string;
    itemExample: boolean;
    artefactItemId?: string;

} & {
    [key in TResourceType]?: number;
}

type TCraftItems = {
    [key in TCraftItemsTypes]: TCraftItem[];
}

export type TConsumableTypes = 'potion' | 'cooked';

export type TConsumableCraftItem = {
    "itemId": string;
    "foodConsumption": number;
    "amountCrafted": number;
} & Record<string, string | number>;

type TConsumableCraftItems = {
    [key in TConsumableTypes]: TConsumableCraftItem[];
}

export type TArtefactClasses = 'WARRIOR' | 'MAGE' | 'HUNTER';
export type TArtefactTypes = 'RUNE' | 'SOUL' | 'RELIC' | 'AVALONIAN';

export interface IArtefact {
    "id": string;
    "artefactId": string
    "equipmentImg": "",
    "itemValue": number[]
}

type TArtefacts = {
    [key in TArtefactClasses]: {
        [key in TArtefactTypes]: IArtefact[];
    }
}

export type TMaterial = {
    "itemId": string;
} & {
    [key in TResourceType]?: number;
}

type TLanguages = 'ru' | 'en';


export type TLanguage = {
    [key: string]: {
        [key in TLanguages]: string;
    }
}

export interface IAppItems {
    githubCommitDate: string;
    appVersion: string;
    craftItems: TCraftItems;
    consumableCraftItems: TConsumableCraftItems;
    artefacts: TArtefacts;
    materials: TMaterial[],
    language: TLanguage;
}

export const dummyItems: IAppItems = {
    githubCommitDate: '',
    appVersion: '',
    craftItems: {
        "MAIN": [],
        "2H": [],
        "BAG": [],
        "CAPE": [],
        "ARMOR": [],
        "HEAD": [],
        "SHOES": [],
        "OFF": [],
    },
    consumableCraftItems: {
        'potion': [],
        'cooked': [],
    },
    artefacts: {
        WARRIOR: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        },
        MAGE: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        },
        HUNTER: {
            RUNE: [],
            SOUL: [],
            RELIC: [],
            AVALONIAN: [],
        }
    },
    materials: [],
    language: {
        'T1_ALCHEMY_EXTRACT_LEVEL': {
            ru: 'Магические экстракты',
            en: 'Arcane Extracts',
        },
        'T1_FISHSAUCE_LEVEL': {
            ru: 'Рыбные соусы',
            en: 'Fish Sauces',
        },
    }
}