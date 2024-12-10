export type TCraftItemsTypes = "MAIN" | "2H" | "BAG" | "CAPE" | "ARMOR" | "HEAD" | "SHOES" | "OFF";
export type TResourceType =
    'METALBAR'
    | 'LEATHER'
    | 'CLOTH'
    | 'PLANKS'
    | 'STONEBLOCK'
    | 'ORE'
    | 'WOOD'
    | 'HIDE'
    | 'FIBER'
    | 'ROCK';

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

export type TCraftItems = {
    [key in TCraftItemsTypes]: TCraftItem[];
}

export type TConsumableTypes = 'potion' | 'cooked';

export type TConsumableCraftItem = {
    "itemId": string;
    "foodConsumption": number;
    "amountCrafted": number;
} & Record<string, string | number>;

export type TConsumableCraftItems = {
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

export type TArtefacts = {
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

export class AppItems {
    githubCommitDate: string;
    appVersion: string;
    craftItems: TCraftItems;
    consumableCraftItems: TConsumableCraftItems;
    artefacts: TArtefacts;
    materials: TMaterial[];
    language: TLanguage;

    constructor(
            githubCommitDate: string,
            appVersion: string,
            craftItems: TCraftItems,
            consumableCraftItems: TConsumableCraftItems,
            artefacts: TArtefacts,
            materials: TMaterial[],
            language: TLanguage
    ) {
        this.githubCommitDate = githubCommitDate;
        this.appVersion = appVersion;
        this.craftItems = craftItems;
        this.consumableCraftItems = consumableCraftItems;
        this.artefacts = artefacts;
        this.materials = materials;
        this.language = language;
    }

}
