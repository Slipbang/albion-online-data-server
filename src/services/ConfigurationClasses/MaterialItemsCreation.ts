import {IaodItems, ICraftResourceItem} from "../../types/AODPItems.js";
import {TMaterial, TResourceType} from "../dummyItems.js";

export class MaterialItemsCreation {

    private static _buildingResourceObjectHandler(resource: ICraftResourceItem) {
        let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_') as TResourceType;
        const materialObject: Partial<TMaterial> = {
            [resourceId]: Number(resource['@count']),
        }
        return materialObject;
    }

    private static _MATERIAL_CATEGORIES = ['metalbar', 'leather', 'cloth', 'planks', 'stoneblock', 'ore', 'wood', 'hide', 'fiber', 'rock'];

    static createMaterialItems(data: IaodItems['simpleitem']): TMaterial[] {
        const materials: TMaterial[] = [];
        for (let item of data) {
            const shopsubcategory1 = item['@shopsubcategory1'];
            let ID = item['@uniquename'];
            const isResource = '@resourcetype' in item;
            const resourceTierAllowed = isResource ? 4 : 3;
            if (!this._MATERIAL_CATEGORIES.includes(shopsubcategory1) || ID.includes('_LEVEL') || +item['@tier'] < resourceTierAllowed) continue;
            let materialObject: TMaterial = {
                itemId: ID,
            }
            const craftResources =
                Array.isArray(item.craftingrequirements)
                    ? item.craftingrequirements?.[0]?.craftresource
                    : item?.craftingrequirements?.craftresource;

            if (craftResources && !isResource) {
                const resources = Array.isArray(craftResources) ? craftResources : [craftResources];

                for (let resource of resources) {
                    const calculationResult = this._buildingResourceObjectHandler(resource);
                    materialObject = {
                        ...materialObject,
                        ...calculationResult,
                    }
                }
            }

            materials.push(materialObject);
        }

        return materials;
    }
}