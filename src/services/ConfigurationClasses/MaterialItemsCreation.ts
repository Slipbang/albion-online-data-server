import {IaodItems, ICraftResourceItem} from "../../types/AODPItems.js";
import {IAppItems, TMaterial, TResourceType} from "../dummyItems.js";

export class MaterialItemsCreation {

    _buildingResourceObjectHandler(resource: ICraftResourceItem, materialObj: TMaterial) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_') as TResourceType;
        materialObj[resourceId] = +resource['@count'];

    }

    _MATERIAL_CATEGORIES = ['metalbar', 'leather', 'cloth', 'planks', 'stoneblock', 'ore', 'wood', 'hide', 'fiber', 'rock'];

    createMaterialItems(data: IaodItems['simpleitem'], items: IAppItems) {
        for (let item of data) {
            const shopsubcategory1 = item['@shopsubcategory1'];
            let ID = item['@uniquename'];
            const isResource = '@resourcetype' in item;
            const resourceTierAllowed = isResource ? 4 : 3;
            if (!this._MATERIAL_CATEGORIES.includes(shopsubcategory1) || ID.includes('_LEVEL') || +item['@tier'] < resourceTierAllowed) continue;
            const materialObj: TMaterial = {
                itemId: ID,
            }
            const craftResources =
                Array.isArray(item.craftingrequirements)
                    ? item.craftingrequirements?.[0]?.craftresource
                    : item?.craftingrequirements?.craftresource;

            if (craftResources && !isResource) {
                if (Array.isArray(craftResources)) {
                    for (let resource of craftResources) {
                        this._buildingResourceObjectHandler(resource, materialObj)
                    }
                } else {
                    this._buildingResourceObjectHandler(craftResources, materialObj);
                }
            }

            items.materials.push(materialObj);
        }
    }
}