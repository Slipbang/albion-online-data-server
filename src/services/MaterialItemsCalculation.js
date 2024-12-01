export class MaterialItemsCalculation {

    _buildingResourceObjectHandler(resource, obj) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_');
        obj[resourceId] = +resource['@count'];

    }

    _MATERIAL_CATEGORIES = ['metalbar', 'leather', 'cloth', 'planks', 'stoneblock', 'ore', 'wood', 'hide', 'fiber', 'rock'];

    createMaterialItems(data, items) {
        for (let item of data) {
            const shopsubcategory1 = item['@shopsubcategory1'];
            let ID = item['@uniquename'];
            const isResource = '@resourcetype' in item;
            const resourceTierAllowed = isResource ? 4 : 3;
            if (!this._MATERIAL_CATEGORIES.includes(shopsubcategory1) || ID.includes('_LEVEL') || +item['@tier'] < resourceTierAllowed) continue;
            const obj = {
                itemId: ID,
            }
            const craftResources = item.craftingrequirements?.[0]?.['craftresource'] || item.craftingrequirements?.['craftresource'];
            if (craftResources && !isResource) {
                if (Array.isArray(craftResources)) {
                    for (let resource of craftResources) {
                        this._buildingResourceObjectHandler(resource, obj)
                    }
                } else {
                    this._buildingResourceObjectHandler(craftResources, obj);
                }
            }

            items.materials.push(obj);
        }
    }
}