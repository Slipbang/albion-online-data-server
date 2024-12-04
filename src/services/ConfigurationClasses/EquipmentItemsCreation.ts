import {ArtefactItemsCreation} from "./ArtefactItemsCreation.ts";
import {IaodItems, ICraftingRequirements, ICraftResourceItem} from "../../types/AODPItems.ts";
import {IAppItems, TCraftItem, TCraftItemsTypes, TResourceType} from "../dummyItems.ts";

export class EquipmentItemsCreation extends ArtefactItemsCreation{

    _buildingResourceObjectHandler(resource: ICraftResourceItem, itemCategory: TCraftItemsTypes, items: IAppItems, itemObj: TCraftItem, artefactsData: IaodItems['simpleitem']) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_');
        if (resourceId.includes('ARTEFACT')) {
            this.createArtefactItem_Obj_Handler(items, itemObj, resourceId, itemCategory, artefactsData);
        } else if (resourceId.includes('SKILLBOOK_STANDARD')) {
            itemObj.artefactItemId = resource['@uniquename'];
        } else {
            itemObj[resourceId as TResourceType] = +resource['@count'];
            itemObj.foodConsumption += +resource['@count'] * 1.8;
        }
    }

    _defineAOTItemParams(shopsubcategory1: string, id: string) {
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

    _ITEM_EXAMPLES = {
        "MAIN": ['FROSTSTAFF', 'ARCANESTAFF', 'CURSEDSTAFF', 'FIRESTAFF', 'HOLYSTAFF', 'NATURESTAFF', 'AXE', 'DAGGER', 'MACE', 'SPEAR', 'SWORD',],
        "2H": ['KNUCKLES_SET1', 'QUARTERSTAFF', 'BOW', 'CROSSBOW',],
        "BAG": ['BAG',],
        "CAPE": ['CAPE',],
        "ARMOR": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "HEAD": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "SHOES": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "OFF": ['SHIELD', 'BOOK', 'ORB_MORGANA', 'TOTEM_KEEPER', 'TORCH',],
    };

    _ITEM_TYPES = ["MAIN", "2H", "BAG", "CAPE", "ARMOR", "HEAD", "SHOES", "OFF",];
    _EQUIPMENT_CATEGORIES = [
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

    _FORBIDDEN = [/_ROYAL/]; // РЕГУЛЯРКИ!!!

    _hasForbiddenParts = (ID: string) => this._FORBIDDEN.some(pattern => pattern.test(ID));

    createItems(data: IaodItems['weapon'], artefactsData: IaodItems['simpleitem'], items: IAppItems) {
        for (let item of data) {
            if ('craftingrequirements' in item) {
                const shopsubcategory1 = item['@shopsubcategory1'];
                let ID = item['@uniquename'];
                const bodyId = ID.split('_').filter((_, index) => index > 1).join('_') || ID.split('_').filter((_, index) => index > 0).join('_');
                let itemCategory = ID.split('_')[1] as TCraftItemsTypes;

                if (this._hasForbiddenParts(ID) || item['@tier'] !== '4' || !this._EQUIPMENT_CATEGORIES.includes(shopsubcategory1) || !this._ITEM_TYPES.includes(itemCategory) || (ID.includes('TOOL') && ID.includes('AVALON'))) continue;
                const craftResources = (item.craftingrequirements as ICraftingRequirements[])?.[0]?.['craftresource'] || (item.craftingrequirements as ICraftingRequirements)?.['craftresource'];
                if (craftResources) {
                    const {itemType, itemClass} = this._defineAOTItemParams(shopsubcategory1, ID);
                    const obj: TCraftItem = {
                        itemId: bodyId,
                        itemNode: shopsubcategory1,
                        foodConsumption: 0,
                        itemType: itemType!,
                        itemClass: itemClass!,
                        itemExample: this._ITEM_EXAMPLES[itemCategory]?.includes(bodyId) || false,
                    }

                    if (Array.isArray(craftResources)) {
                        for (let resource of craftResources) {
                            this._buildingResourceObjectHandler(resource, itemCategory, items, obj, artefactsData)
                        }
                    } else {
                        this._buildingResourceObjectHandler(craftResources, itemCategory, items, obj, artefactsData);
                    }
                    items.craftItems[itemCategory].push(obj);
                }
            }
        }
    }
}