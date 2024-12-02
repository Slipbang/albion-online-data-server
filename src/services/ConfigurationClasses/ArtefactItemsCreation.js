export class ArtefactItemsCreation {

    _defineArtefactType_Value (artefactId, artefactData) {
        const requiredArtefact = artefactData?.find(artefact => artefact["@uniquename"].includes(artefactId));

        if (requiredArtefact) {
            return {
                artefactType: requiredArtefact['craftingrequirements']['craftresource']['@uniquename']?.split('_')?.pop(),
                artefactValue: +requiredArtefact['@itemvalue'],
            }
        }
        return {
            artefactType: '',
            artefactValue: 0,
        }
    }

    _artefactIncreasingValue = {
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

    createArtefactItem_Obj_Handler(items, obj, resourceId, resource, itemCategory, artefactData){
        obj.artefactItemId = resourceId;
        let {artefactType, artefactValue} = this._defineArtefactType_Value(resourceId, artefactData);
        obj.foodConsumption = +((this._artefactIncreasingValue?.[itemCategory]?.[artefactType] || 0) + obj.foodConsumption).toFixed(2);

        if (artefactType in items.artefacts[obj.itemClass.toUpperCase()]) {
            const len = items.artefacts[obj.itemClass.toUpperCase()][artefactType].length;
            items.artefacts[obj.itemClass.toUpperCase()][artefactType].push({
                id: `${obj.itemClass.toUpperCase()}_${artefactType}_${len + 1}`,
                artefactId: resourceId,
                equipmentImg: '',
                itemValue: Array.from({length: 5}).fill(artefactValue).map((count => val => {
                    const res = val * count;
                    count *= 2;
                    return res;
                })(1)),
            })
        }
    }
}