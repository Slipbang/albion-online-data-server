import {IaodItems, ICraftingRequirements, ICraftResourceItem} from "../../types/AODPItems.js";
import {TConsumableCraftItem, TConsumableCraftItems, TConsumableTypes} from "../dummyItems.js";

export class ConsumableItemsCreation {

    private static _buildConsumableResourceObjectHandler (resource: ICraftResourceItem) {
        const special = ['T1_FISHSAUCE_LEVEL1', 'T1_ALCHEMY_EXTRACT_LEVEL1'];
        let resourceId = resource['@uniquename'];
        const foodConsumptionCount = resourceId.includes('QUESTITEM_TOKEN_AVALON') ? 7.2 : 4.5;
        let consumableObject: Partial<TConsumableCraftItem> = {
            foodConsumption: 0,
        };

        if (special.includes(resourceId)) {
            resourceId = resourceId.split('_').map(str => (str === 'LEVEL1') ? 'LEVEL' : str).join('_');
        } else {
            // в случае если ресурс специфичный - налог не считается.
            if (!resourceId.includes('_FISH_') && !resourceId.includes('_ALCHEMY_')) {
                consumableObject = {
                    ...consumableObject,
                    foodConsumption: consumableObject.foodConsumption! + Number(resource["@count"]) * foodConsumptionCount,
                }
            }
        }
        consumableObject = {
            ...consumableObject,
            [resourceId]: Number(resource["@count"]),
        }

        return consumableObject;
    }

    private static _CONSUMABLE_CATEGORIES = ['potion', 'cooked'];

    static createConsumableItems (data: IaodItems['consumableitem']) {
        const consumableCraftItems: TConsumableCraftItems = {
            potion: [],
            cooked: [],
        };
        for (let item of data) {
            if ('enchantments' in item) {
                const shopsubcategory1 = item['@shopsubcategory1'] as TConsumableTypes;
                if (+item['@tier'] < 4 || !this._CONSUMABLE_CATEGORIES.includes(shopsubcategory1)) continue;
                const craftResources = item["enchantments"]!["enchantment"][0]['craftingrequirements']['craftresource'];
                const itemId = item["@uniquename"];
                if (craftResources) {
                    let consumableObject: TConsumableCraftItem = {
                        itemId,
                        foodConsumption: 0,
                        amountCrafted: +(item['craftingrequirements'] as ICraftingRequirements)?.['@amountcrafted']!,
                    };

                    const resources = Array.isArray(craftResources) ? craftResources : [craftResources];

                    for (let resource of resources) {
                        const calculationResult = this._buildConsumableResourceObjectHandler(resource);

                        consumableObject = {
                            ...consumableObject,
                            ...calculationResult,
                            foodConsumption: consumableObject.foodConsumption + (calculationResult?.foodConsumption || 0),
                        }
                    }

                    consumableCraftItems[shopsubcategory1].push(consumableObject);
                }
            }
        }

        return consumableCraftItems;
    }
}