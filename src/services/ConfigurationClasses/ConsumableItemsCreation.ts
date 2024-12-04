import {IaodItems, ICraftingRequirements, ICraftResourceItem} from "../../types/AODPItems.ts";
import {IAppItems, TConsumableCraftItem, TConsumableTypes} from "../dummyItems.ts";

export class ConsumableItemsCreation {

    _buildConsumableResourceObjectHandler (resource: ICraftResourceItem, obj: TConsumableCraftItem) {
        const special = ['T1_FISHSAUCE_LEVEL1', 'T1_ALCHEMY_EXTRACT_LEVEL1'];
        let resourceId = resource['@uniquename'];
        const foodConsumptionCount = resourceId.includes('QUESTITEM_TOKEN_AVALON') ? 7.2 : 4.5;
        if (special.includes(resourceId)) {
            resourceId = resourceId.split('_').map(str => (str === 'LEVEL1') ? 'LEVEL' : str).join('_');
        } else {
            if (!resourceId.includes('_FISH_') && !resourceId.includes('_ALCHEMY_')) {
                obj.foodConsumption += +resource["@count"] * foodConsumptionCount;
            }
        }
        obj[resourceId] = +resource["@count"];
    }

    _CONSUMABLE_CATEGORIES = ['potion', 'cooked'];

    createConsumableItems (data: IaodItems['consumableitem'], items: IAppItems) {
        for (let item of data) {
            if ('enchantments' in item) {
                const shopsubcategory1 = item['@shopsubcategory1'] as TConsumableTypes;
                if (+item['@tier'] < 4 || !this._CONSUMABLE_CATEGORIES.includes(shopsubcategory1)) continue;
                const craftResources = item["enchantments"]!["enchantment"][0]['craftingrequirements']['craftresource'];
                const itemId = item["@uniquename"];
                if (craftResources) {
                    let obj: TConsumableCraftItem = {
                        itemId,
                        foodConsumption: 0,
                        amountCrafted: +(item['craftingrequirements'] as ICraftingRequirements)?.['@amountcrafted']!,
                    };

                    if (Array.isArray(craftResources)) {
                        for (let resource of craftResources) {
                            this._buildConsumableResourceObjectHandler(resource, obj)
                        }
                    } else {
                        this._buildConsumableResourceObjectHandler(craftResources, obj)
                    }

                    items.consumableCraftItems[shopsubcategory1].push(obj);
                }
            }
        }
    }
}