import {IaodItems, ICraftingRequirements, ICraftResourceItem} from "../../types/AODPItems";
import {IAppItems, TArtefactClasses, TArtefactTypes, TCraftItem, TCraftItemsTypes} from "../dummyItems";

type TArtefacts = {
    [key in TCraftItemsTypes]: {
        [key in TArtefactTypes]?: number;
    }
}

export class ArtefactItemsCreation {

    private static _defineArtefactType_Value (artefactId: string, artefactData: IaodItems['simpleitem']): {artefactType: TArtefactTypes, artefactValue: number} {
        const requiredArtefact = artefactData.find(artefact => artefact["@uniquename"].includes(artefactId));

        return {
            artefactType: ((requiredArtefact!['craftingrequirements'] as ICraftingRequirements)['craftresource'] as ICraftResourceItem)['@uniquename'].split('_')?.pop() as TArtefactTypes,
            artefactValue: +requiredArtefact?.['@itemvalue']!,
        }
    }

    private static _artefactIncreasingValue: TArtefacts = {
        'MAIN': {
            'RUNE': 10.8,
            'SOUL': 32.4,
            'RELIC': 0,
            'AVALONIAN': 162,
        },
        '2H': {
            'RUNE': 14.4,
            'SOUL': 50.4,
            'RELIC': 100.8,
            'AVALONIAN': 216,
        },
        'BAG': {},
        'CAPE': {},
        'ARMOR': {
            'RUNE': 7.2,
            'SOUL': 21.6,
            'RELIC': 50.4,
            'AVALONIAN': 108,
        },
        'HEAD': {
            'RUNE': 3.6,
            'SOUL': 10.8,
            'RELIC': 25.2,
            'AVALONIAN': 54,
        },
        'SHOES': {
            'RUNE': 3.6,
            'SOUL': 10.8,
            'RELIC': 25.2,
            'AVALONIAN': 54,
        },
        'OFF': {
            'RUNE': 3.6,
            'SOUL': 10.8,
            'RELIC': 25.2,
            'AVALONIAN': 54,
        },
    }

    private static _calculateItemValue(baseValue: number, length: number): number[] {
        return Array.from({ length }).map((_, i) => baseValue * Math.pow(2, i));
    }

    static createArtefactItem_Obj_Handler(items: IAppItems, itemObj: TCraftItem, resourceId: string, itemCategory: TCraftItemsTypes, artefactData: IaodItems['simpleitem']){
        itemObj.artefactItemId = resourceId;
        let {artefactType, artefactValue} = this._defineArtefactType_Value(resourceId, artefactData);
        itemObj.foodConsumption = +((this._artefactIncreasingValue?.[itemCategory]?.[artefactType!] || 0) + itemObj.foodConsumption).toFixed(2);
        const artefactClass = itemObj.itemClass.toUpperCase() as TArtefactClasses;

        if (artefactType && artefactType in items.artefacts[artefactClass]) {
            const len = items.artefacts[artefactClass][artefactType!].length;
            items.artefacts[artefactClass][artefactType! as TArtefactTypes].push({
                id: `${artefactClass}_${artefactType}_${len + 1}`,
                artefactId: resourceId,
                equipmentImg: '',
                itemValue: this._calculateItemValue(artefactValue, 5),
            })
        }
    }
}