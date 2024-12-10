import {IaodItems, ICraftingRequirements, ICraftResourceItem} from "../../types/AODPItems";
import {IArtefact, TArtefactClasses, TArtefactTypes, TCraftItemsTypes} from "../dummyItems";

type TArtefacts = {
    [key in TCraftItemsTypes]: {
        [key in TArtefactTypes]?: number;
    }
}

export interface IArtefactParams {
    artefact: IArtefact,
    params: {
        artefactClass: TArtefactClasses;
        artefactType: TArtefactTypes;
    }
}

export class ArtefactItemsCreation {

    private static _defineArtefactType_Value(artefactId: string, artefactData: IaodItems['simpleitem']): { artefactType: TArtefactTypes, artefactValue: number } {
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
    private static readonly ALLOWED_ARTEFACTS: TArtefactTypes[] = ['RUNE', 'SOUL', 'RELIC', 'AVALONIAN'];

    private static _calculateItemValue(baseValue: number, length: number): number[] {
        return Array.from({length}).map((_, i) => baseValue * Math.pow(2, i));
    }

    static createArtefactItemHandler(itemClass: string, foodConsumption: number, resourceId: string, itemCategory: TCraftItemsTypes, artefactData: IaodItems['simpleitem']) {
        let artefactObject: IArtefactParams | null  = null
        let {artefactType, artefactValue} = this._defineArtefactType_Value(resourceId, artefactData);
        const artefactClass = itemClass.toUpperCase() as TArtefactClasses;

        if (artefactType && this.ALLOWED_ARTEFACTS.includes(artefactType)) {
            artefactObject = {
                artefact: {
                    id: `${artefactClass}_${artefactType}_${resourceId}`,
                    artefactId: resourceId,
                    equipmentImg: '',
                    itemValue: this._calculateItemValue(artefactValue, 5),
                },
                params: {
                    artefactClass,
                    artefactType,
                }
            }
        }

        return {
            artefactObject,
            itemParams: {
                artefactItemId: resourceId,
                foodConsumption: +((this._artefactIncreasingValue?.[itemCategory]?.[artefactType!] || 0) + foodConsumption).toFixed(2),
            }
        };
    }
}