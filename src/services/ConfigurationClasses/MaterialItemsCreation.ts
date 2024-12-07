import {IaodItems, ICraftResourceItem} from "../../types/AODPItems.js";
import {IAppItems, TMaterial, TResourceType} from "../dummyItems.js";

export class MaterialItemsCreation {

    private static _buildingResourceObjectHandler(resource: ICraftResourceItem, materialObject: TMaterial) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_') as TResourceType;
        materialObject[resourceId] = +resource['@count'];

    }

    private static _MATERIAL_CATEGORIES = ['metalbar', 'leather', 'cloth', 'planks', 'stoneblock', 'ore', 'wood', 'hide', 'fiber', 'rock'];

    static createMaterialItems(data: IaodItems['simpleitem'], items: IAppItems) {
        for (let item of data) {
            const shopsubcategory1 = item['@shopsubcategory1'];
            let ID = item['@uniquename'];
            const isResource = '@resourcetype' in item;
            const resourceTierAllowed = isResource ? 4 : 3;
            if (!this._MATERIAL_CATEGORIES.includes(shopsubcategory1) || ID.includes('_LEVEL') || +item['@tier'] < resourceTierAllowed) continue;
            const materialObject: TMaterial = {
                itemId: ID,
            }
            const craftResources =
                Array.isArray(item.craftingrequirements)
                    ? item.craftingrequirements?.[0]?.craftresource
                    : item?.craftingrequirements?.craftresource;

            if (craftResources && !isResource) {
                if (Array.isArray(craftResources)) {
                    for (let resource of craftResources) {
                        this._buildingResourceObjectHandler(resource, materialObject)
                    }
                } else {
                    this._buildingResourceObjectHandler(craftResources, materialObject);
                }
            }

            items.materials.push(materialObject);
        }
    }
}