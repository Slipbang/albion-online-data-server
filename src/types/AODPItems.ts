export interface ICraftResourceItem {
    "@uniquename": string;
    "@count": string;
}

export interface ICraftingRequirements {
    "craftresource": ICraftResourceItem[] | ICraftResourceItem;
    "@amountcrafted"?: string;
}

interface IEnchantment {
    "craftingrequirements": ICraftingRequirements
}

export interface IEnchantments {
    "enchantment": IEnchantment[];
}

interface IItem {
    "@uniquename": string;
    "@shopsubcategory1": string;
    "@tier": string;
    "@itemvalue"?: string;
    "enchantments"?: IEnchantments;
    "craftingrequirements"?: ICraftingRequirements[] | ICraftingRequirements;
}

export interface IaodItems {
    weapon: IItem[];
    equipmentitem: IItem[];
    simpleitem: IItem[];
    consumableitem: IItem[];
}

export interface I_AOD_JSON_DATA{
    items: IaodItems;
}