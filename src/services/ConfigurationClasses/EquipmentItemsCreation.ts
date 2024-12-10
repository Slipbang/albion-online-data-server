import {ArtefactItemsCreation, IArtefactParams} from "./ArtefactItemsCreation.js";
import {IaodItems, ICraftingRequirements, ICraftResourceItem} from "../../types/AODPItems.js";
import {
    TArtefacts,
    TCraftItem,
    TCraftItems,
    TCraftItemsTypes,
    TResourceType
} from "../dummyItems.js";

export class EquipmentItemsCreation {

    private static _buildingResource_Artefact_ObjectHandler(resource: ICraftResourceItem, itemCategory: TCraftItemsTypes, itemObject: TCraftItem, artefactsData: IaodItems['simpleitem']) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_');
        let artefactObject: IArtefactParams | null  = null
        let itemParams: Partial<TCraftItem>;
        if (resourceId.includes('ARTEFACT')) {
            ({artefactObject, itemParams} = ArtefactItemsCreation.createArtefactItemHandler(itemObject.itemClass, itemObject.foodConsumption, resourceId, itemCategory, artefactsData))
        } else if (resourceId.includes('SKILLBOOK_STANDARD')) {
            itemParams = {
                artefactItemId: resource['@uniquename'],
            }
        } else {
            itemParams = {
                [resourceId as TResourceType]: +resource['@count'],
                foodConsumption: itemObject.foodConsumption + Number(resource['@count']) * 1.8,
            }
        }

        return {
            artefactObject,
            itemParams,
        }
    }

    private static _defineAOTItemParams(shopsubcategory1: string, id: string) {
        if (shopsubcategory1.includes('_')) {
            const [materialType, itemType] = shopsubcategory1.split('_') as [string, string];
            const itemClasses = {
                plate: 'warrior',
                cloth: 'mage',
                leather: 'hunter',
            }
            type MaterialType = keyof typeof itemClasses;

            if (materialType in itemClasses) {
                return {
                    itemType,
                    itemClass: itemClasses[materialType as MaterialType],
                }
            }
        }

        switch (shopsubcategory1) {
            case 'crossbow':
            case 'sword':
            case 'axe':
            case 'hammer':
            case 'mace':
            case 'knuckles':
                return {
                    itemType: 'warriorWeapon',
                    itemClass: 'warrior',
                }

            case 'shield':
                return {
                    itemType: 'offHand',
                    itemClass: 'warrior',
                }

            case 'cursestaff':
            case 'firestaff':
            case 'froststaff':
            case 'holystaff':
            case 'arcanestaff':
                return {
                    itemType: 'mageWeapon',
                    itemClass: 'mage',
                }

            case 'orb':
            case 'book':
            case 'totem':
                return {
                    itemType: 'offHand',
                    itemClass: 'mage',
                }

            case 'bow':
            case 'naturestaff':
            case 'dagger':
            case 'spear':
            case 'quarterstaff':
                return {
                    itemType: 'hunterWeapon',
                    itemClass: 'hunter',
                }

            case 'torch': {
                const params: {itemType: string, itemClass?: string} = {itemType: 'offHand'}
                if (id.includes('CENSER_AVALON')) {
                    params.itemClass = 'mage';
                } else {
                    params.itemClass = 'hunter';
                }
                return params;
            }

            case 'demolitionhammer':
            case 'pickaxe':
            case 'sickle':
            case 'skinningknife':
            case 'stonehammer':
            case 'woodaxe':
            case 'fishing':
            case 'fibergatherer_helmet':
            case 'fibergatherer_armor':
            case 'fibergatherer_shoes':
            case 'fishgatherer_helmet':
            case 'fishgatherer_armor':
            case 'fishgatherer_shoes':
            case 'hidegatherer_helmet':
            case 'hidegatherer_armor':
            case 'hidegatherer_shoes':
            case 'oregatherer_helmet':
            case 'oregatherer_armor':
            case 'oregatherer_shoes':
            case 'rockgatherer_helmet':
            case 'rockgatherer_armor':
            case 'rockgatherer_shoes':
            case 'woodgatherer_helmet':
            case 'woodgatherer_armor':
            case 'woodgatherer_shoes':
                return {
                    itemType: 'tools',
                    itemClass: 'toolmaker',
                }

            case 'cape':
                return {
                    itemType: 'tools',
                    itemClass: 'toolmaker',
                }

            case 'bag':
                return {
                    itemType: 'tools',
                    itemClass: 'toolmaker',
                }

            default:
                return {
                    itemType: null,
                    itemClass: null,
                }
        }
    }

    private static readonly ITEM_EXAMPLES = {
        "MAIN": ['FROSTSTAFF', 'ARCANESTAFF', 'CURSEDSTAFF', 'FIRESTAFF', 'HOLYSTAFF', 'NATURESTAFF', 'AXE', 'DAGGER', 'MACE', 'SPEAR', 'SWORD',],
        "2H": ['KNUCKLES_SET1', 'QUARTERSTAFF', 'BOW', 'CROSSBOW',],
        "BAG": ['BAG',],
        "CAPE": ['CAPE',],
        "ARMOR": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "HEAD": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "SHOES": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "OFF": ['SHIELD', 'BOOK', 'ORB_MORGANA', 'TOTEM_KEEPER', 'TORCH',],
    };

    private static readonly ITEM_TYPES = ["MAIN", "2H", "BAG", "CAPE", "ARMOR", "HEAD", "SHOES", "OFF"];
    private static readonly EQUIPMENT_CATEGORIES = [
        'demolitionhammer', 'pickaxe', 'sickle', 'skinningknife', 'stonehammer',
        'woodaxe', 'fishing', 'bow', 'crossbow', 'cursestaff', 'firestaff', 'froststaff',
        'arcanestaff', 'holystaff', 'naturestaff', 'dagger', 'spear',
        'axe', 'sword', 'quarterstaff', 'hammer', 'mace', 'knuckles',
        'cape', 'bag', 'torch', 'totem', 'book',
        'orb', 'shield', 'cloth_helmet', 'cloth_armor', 'cloth_shoes',
        'leather_helmet', 'leather_armor', 'leather_shoes', 'plate_helmet',
        'plate_armor', 'plate_shoes',
        'fibergatherer_helmet', 'fibergatherer_armor', 'fibergatherer_shoes',
        'fishgatherer_helmet', 'fishgatherer_armor', 'fishgatherer_shoes',
        'hidegatherer_helmet', 'hidegatherer_armor', 'hidegatherer_shoes',
        'oregatherer_helmet', 'oregatherer_armor', 'oregatherer_shoes',
        'rockgatherer_helmet', 'rockgatherer_armor', 'rockgatherer_shoes',
        'woodgatherer_helmet', 'woodgatherer_armor', 'woodgatherer_shoes'
    ];

    private static readonly FORBIDDEN = [/_ROYAL/]; // РЕГУЛЯРКИ!!!

    private static _hasForbiddenParts = (ID: string) => this.FORBIDDEN.some(pattern => pattern.test(ID));

    static createItems(data: IaodItems['weapon'], artefactsData: IaodItems['simpleitem']) {
        const craftItems: TCraftItems = {
            "MAIN": [],
            "2H": [],
            "BAG": [],
            "CAPE": [],
            "ARMOR": [],
            "HEAD": [],
            "SHOES": [],
            "OFF": [],
        };
        const artefacts: TArtefacts = {
            WARRIOR: { RUNE: [], SOUL: [], RELIC: [], AVALONIAN: [] },
            MAGE: { RUNE: [], SOUL: [], RELIC: [], AVALONIAN: [] },
            HUNTER: {RUNE: [], SOUL: [], RELIC: [], AVALONIAN: [] }
        };
        for (let item of data) {
            if ('craftingrequirements' in item) {
                const shopsubcategory1 = item['@shopsubcategory1'];
                let ID = item['@uniquename'];
                const bodyId = ID.split('_').filter((_, index) => index > 1).join('_') || ID.split('_').filter((_, index) => index > 0).join('_');
                let itemCategory = ID.split('_')[1] as TCraftItemsTypes;

                if (this._hasForbiddenParts(ID) || item['@tier'] !== '4' || !this.EQUIPMENT_CATEGORIES.includes(shopsubcategory1) || !this.ITEM_TYPES.includes(itemCategory) || (ID.includes('TOOL') && ID.includes('AVALON'))) continue;
                const craftResources = (item.craftingrequirements as ICraftingRequirements[])?.[0]?.['craftresource'] || (item.craftingrequirements as ICraftingRequirements)?.['craftresource'];
                if (craftResources) {
                    const {itemType, itemClass} = this._defineAOTItemParams(shopsubcategory1, ID);
                    let itemObject: TCraftItem = {
                        itemId: bodyId,
                        itemNode: shopsubcategory1,
                        foodConsumption: 0,
                        itemType: itemType!,
                        itemClass: itemClass!,
                        itemExample: this.ITEM_EXAMPLES[itemCategory]?.includes(bodyId) || false,
                    }

                    let artefactObject: IArtefactParams | null  = null

                    const resources = Array.isArray(craftResources) ? craftResources : [craftResources];

                    for (let resource of resources) {
                        let calculationResult = this._buildingResource_Artefact_ObjectHandler(
                            resource,
                            itemCategory,
                            itemObject,
                            artefactsData
                        );

                        itemObject = {
                            ...itemObject,
                            ...calculationResult.itemParams,
                        };

                        if (calculationResult.artefactObject) {
                            artefactObject = {...calculationResult.artefactObject};
                        }
                    }


                    craftItems[itemCategory].push(itemObject);

                    if (artefactObject) {
                        const {artefact, params} = artefactObject;
                        const {artefactClass, artefactType} = params;

                        artefacts[artefactClass][artefactType].push(artefact);
                    }
                }
            }
        }
        return {
            craftItems,
            artefacts,
        };
    }
}