export class EquipmentItems {
    constructor(data) {
        this.data = data;
    }

    _buildingResourceObjectHandler(resource, itemCategory, items, obj, findItemNameHandler, createArtefactItem_Obj_Handler) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_');
        if (resourceId.includes('ARTEFACT')) {
            createArtefactItem_Obj_Handler(items, obj, resourceId, resource, itemCategory, findItemNameHandler)
        } else if (resourceId.includes('SKILLBOOK_STANDARD')) {
            obj.artefactItemId = resource['@uniquename'];
        } else {
            obj[resourceId] = +resource['@count'];
            obj.foodConsumption += +resource['@count'] * 1.8;
        }
    }

    _defineAOTItemParams(shopsubcategory1, id) {
        if (shopsubcategory1.includes('_')) {
            const [materialType, itemType] = shopsubcategory1.split('_');
            const itemClasses = {
                plate: 'warrior',
                cloth: 'mage',
                leather: 'hunter',
            }
            if (materialType in itemClasses) {
                return {
                    itemType,
                    itemClass: itemClasses[materialType],
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
                const params = {itemType: 'offHand'}
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

    _itemExamples = {
        "MAIN": ['FROSTSTAFF', 'ARCANESTAFF', 'CURSEDSTAFF', 'FIRESTAFF', 'HOLYSTAFF', 'NATURESTAFF', 'AXE', 'DAGGER', 'MACE', 'SPEAR', 'SWORD',],
        "2H": ['KNUCKLES_SET1', 'QUARTERSTAFF', 'BOW', 'CROSSBOW',],
        "BAG": ['BAG',],
        "CAPE": ['CAPE',],
        "ARMOR": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "HEAD": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "SHOES": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
        "OFF": ['SHIELD', 'BOOK', 'ORB_MORGANA', 'TOTEM_KEEPER', 'TORCH',],
    };

    _itemCategories = ["MAIN", "2H", "BAG", "CAPE", "ARMOR", "HEAD", "SHOES", "OFF",];

    createItems(category, items, findItemNameHandler, createArtefactItem_Obj_Handler) {
        for (let item of this.data) {
            if ('craftingrequirements' in item) {
                const shopsubcategory1 = item['@shopsubcategory1'];
                let ID = item['@uniquename'];
                const bodyId = ID.split('_').filter((_, index) => index > 1).join('_') || ID.split('_').filter((_, index) => index > 0).join('_');
                let itemCategory = ID.split('_')[1];
                if (item['@tier'] !== '4' || !category.includes(shopsubcategory1) || !this._itemCategories.includes(itemCategory) || (ID.includes('TOOL') && ID.includes('AVALON'))) continue;
                const craftResources = item.craftingrequirements?.[0]?.['craftresource'] || item.craftingrequirements?.['craftresource'];
                if (craftResources) {
                    const {itemType, itemClass} = this._defineAOTItemParams(shopsubcategory1, ID);
                    const obj = {
                        itemId: bodyId,
                        itemNode: shopsubcategory1,
                        itemName: findItemNameHandler(ID),
                        foodConsumption: 0,
                        itemType,
                        itemClass,
                        itemExample: this._itemExamples[itemCategory]?.includes(bodyId) || false,
                    }

                    if (Array.isArray(craftResources)) {
                        for (let resource of craftResources) {
                            this._buildingResourceObjectHandler(resource, itemCategory, items, obj, findItemNameHandler, createArtefactItem_Obj_Handler)
                        }
                    } else {
                        this._buildingResourceObjectHandler(craftResources, itemCategory, items, obj, findItemNameHandler, createArtefactItem_Obj_Handler);
                    }
                    items.craftItems[itemCategory].push(obj);
                }
            }
        }
    }
}