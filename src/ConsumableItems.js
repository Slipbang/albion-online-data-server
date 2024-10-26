export class ConsumableItems {
    constructor(data) {
        this.data = data;
    }

    _buildConsumableResourceObjectHandler (resource, obj) {
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

    createConsumableItems (category, items) {
        for (let item of this.data) {
            if ('enchantments' in item) {
                const shopsubcategory1 = item['@shopsubcategory1'];
                if (+item['@tier'] < 4 || !category.includes(shopsubcategory1)) continue;
                const craftResources = item.enchantments?.enchantment[0]?.['craftingrequirements']['craftresource'];
                const itemId = item["@uniquename"];
                if (craftResources) {
                    let obj = {
                        itemId,
                        foodConsumption: 0,
                        amountCrafted: +item['craftingrequirements']?.['@amountcrafted'],
                    };

                    if (Array.isArray(craftResources)) {
                        for (let resource of craftResources) {
                            this._buildConsumableResourceObjectHandler(resource, obj, items)
                        }
                    } else {
                        this._buildConsumableResourceObjectHandler(craftResources, obj, items)
                    }

                    items.consumableCraftItems[shopsubcategory1].push(obj);
                }
            }
        }
    }
}