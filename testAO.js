// import fetch from "node-fetch";
// import * as fs from "fs";
// import * as path from "path";
// import {fileURLToPath} from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// let urlItems = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/items.json';
// let urlLocalization = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/refs/heads/master/formatted/items.json';
//
// const items = {
//     craftItems: {
//         "MAIN": [],
//         "2H": [],
//         "BAG": [],
//         "CAPE": [],
//         "ARMOR": [],
//         "HEAD": [],
//         "SHOES": [],
//         "OFF": [],
//     },
//     consumablesCraftItems: {
//         'potion': [],
//         'cooked': [],
//     },
//     artefacts: {
//         WARRIOR: {
//             RUNE: [],
//             SOUL: [],
//             RELIC: [],
//             AVALONIAN: [],
//         },
//         MAGE: {
//             RUNE: [],
//             SOUL: [],
//             RELIC: [],
//             AVALONIAN: [],
//         },
//         HUNTER: {
//             RUNE: [],
//             SOUL: [],
//             RELIC: [],
//             AVALONIAN: [],
//         }
//     },
//     consumablesName: {
//         T1_ALCHEMY_EXTRACT_LEVEL1: null,
//         T1_ALCHEMY_EXTRACT_LEVEL2: null,
//         T1_ALCHEMY_EXTRACT_LEVEL3: null,
//         T1_FISHSAUCE_LEVEL1: null,
//         T1_FISHSAUCE_LEVEL2: null,
//         T1_FISHSAUCE_LEVEL3: null,
//         T2_BEAN: null,
//         T1_ALCHEMY_EXTRACT_LEVEL: {
//             ru: 'Магические экстракты',
//             en: 'Arcane Extracts',
//         },
//         T1_FISHSAUCE_LEVEL: {
//             ru: 'Рыбные соусы',
//             en: 'Fish Sauces',
//         },
//     }
// }
//
// const weaponCategories = [
//     'demolitionhammer', 'pickaxe', 'sickle', 'skinningknife', 'stonehammer',
//     'woodaxe', 'fishing', 'bow', 'crossbow', 'cursestaff', 'firestaff', 'froststaff',
//     'arcanestaff', 'holystaff', 'naturestaff', 'dagger', 'spear',
//     'axe', 'sword', 'quarterstaff', 'hammer', 'mace', 'knuckles'
// ]
//
// const equipmentCategories = ['cape', 'bag', 'torch', 'totem', 'book',
//     'orb', 'shield', 'cloth_helmet', 'cloth_armor', 'cloth_shoes',
//     'leather_helmet', 'leather_armor', 'leather_shoes', 'plate_helmet',
//     'plate_armor', 'plate_shoes',
//     'fibergatherer_helmet', 'fibergatherer_armor', 'fibergatherer_shoes',
//     'fishgatherer_helmet', 'fishgatherer_armor', 'fishgatherer_shoes',
//     'hidegatherer_helmet', 'hidegatherer_armor', 'hidegatherer_shoes',
//     'oregatherer_helmet', 'oregatherer_armor', 'oregatherer_shoes',
//     'rockgatherer_helmet', 'rockgatherer_armor', 'rockgatherer_shoes',
//     'woodgatherer_helmet', 'woodgatherer_armor', 'woodgatherer_shoes'];
//
// const consumableCategories = ['potion', 'cooked']
//
// let languageData = new Map();
// let itemData = {};


// //+
// const itemCategories = ["MAIN", "2H", "BAG", "CAPE", "ARMOR", "HEAD", "SHOES", "OFF",];

// //+
// const itemExamples = {
//     "MAIN": ['FROSTSTAFF', 'ARCANESTAFF', 'CURSEDSTAFF', 'FIRESTAFF', 'HOLYSTAFF', 'NATURESTAFF', 'AXE', 'DAGGER', 'MACE', 'SPEAR', 'SWORD',],
//     "2H": ['KNUCKLES_SET1', 'QUARTERSTAFF', 'BOW', 'CROSSBOW',],
//     "BAG": ['BAG',],
//     "CAPE": ['CAPE',],
//     "ARMOR": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
//     "HEAD": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
//     "SHOES": ['CLOTH_SET1', 'LEATHER_SET1', 'PLATE_SET1',],
//     "OFF": ['SHIELD', 'BOOK', 'ORB_MORGANA', 'TOTEM_KEEPER', 'TORCH',],
// };
//
// //+
// const defineArtefactType_Value = (artefactId, data) => {
//     for (let item of data) {
//         if (item["@uniquename"].includes(artefactId)) {
//             return {
//                 artefactType: item['craftingrequirements']['craftresource']['@uniquename']?.split('_')?.pop(),
//                 artefactValue: +item['@itemvalue'],
//             };
//         }
//     }
//     return null;
// }
//
// //+
// const artefactIncreasingValue = {
//     'MAIN': {
//         'RUNE': 10.8,
//         'SOUL': 32.4,
//         'RELIC': 0,
//         'AVALONIAN': 162,
//     },
//     '2H': {
//         'RUNE': 14.4,
//         'SOUL': 50.4,
//         'RELIC': 100.8,
//         'AVALONIAN': 216,
//     },
//     'BAG': {},
//     'CAPE': {},
//     'ARMOR': {
//         'RUNE': 7.2,
//         'SOUL': 21.6,
//         'RELIC': 50.4,
//         'AVALONIAN': 108,
//     },
//     'HEAD': {
//         'RUNE': 3.6,
//         'SOUL': 10.8,
//         'RELIC': 25.2,
//         'AVALONIAN': 54,
//     },
//     'SHOES': {
//         'RUNE': 3.6,
//         'SOUL': 10.8,
//         'RELIC': 25.2,
//         'AVALONIAN': 54,
//     },
//     'OFF': {
//         'RUNE': 3.6,
//         'SOUL': 10.8,
//         'RELIC': 25.2,
//         'AVALONIAN': 54,
//     },
// }

// //+
// const buildingResourceObjectHandler = (resource, itemCategory, obj) => {
//     let resourceId = resource['@uniquename'].split('_').filter((str, index) => index > 0).join('_');
//     if (resourceId.includes('ARTEFACT')) {
//         obj.artefactItemId = resourceId;
//         let {artefactType,artefactValue} = defineArtefactType_Value(resourceId, itemData.items.simpleitem);
//         obj.foodConsumption = +((artefactIncreasingValue?.[itemCategory]?.[artefactType] || 0) + obj.foodConsumption).toFixed(2);
//
//         if (artefactType in items.artefacts[obj.itemClass.toUpperCase()]) {
//             const language = languageData.get(resource['@uniquename'])
//             const len = items.artefacts[obj.itemClass.toUpperCase()][artefactType].length;
//             items.artefacts[obj.itemClass.toUpperCase()][artefactType].push({
//                 id: `${obj.itemClass.toUpperCase()}_${artefactType}_${len+1}`,
//                 artefactName: {
//                     ru: language["LocalizedNames"]["RU-RU"].split(' ').filter(str => str !== '(знаток)').join(' '),
//                     en: language["LocalizedNames"]["EN-US"].split(' ').filter(str => str !== 'Adept\'s').join(' '),
//                 },
//                 artefactId: resourceId,
//                 equipmentImg: '',
//                 itemValue: Array.from({length: 5}).fill(artefactValue).map((count => val => {
//                     const res = val * count;
//                     count *= 2;
//                     return res;
//                 })(1)),
//             })
//         }
//     } else if (resourceId.includes('SKILLBOOK_STANDARD')) {
//         obj.artefactItemId = resource['@uniquename'];
//     } else {
//         obj[resourceId] = +resource['@count'];
//         obj.foodConsumption += +resource['@count'] * 1.8;
//     }
// }

// //+
// const buildConsumableResourceObjectHandler = (resource, obj) => {
//     const special = ['T1_FISHSAUCE_LEVEL1', 'T1_ALCHEMY_EXTRACT_LEVEL1'];
//     let resourceId = resource['@uniquename'];
//     if (!(resourceId in items.consumablesName)) {
//         items.consumablesName[resourceId] = null;
//     }
//     const foodConsumptionCount = resourceId.includes('QUESTITEM_TOKEN_AVALON') ? 7.2 : 4.5;
//     if (special.includes(resourceId)) {
//         resourceId = resourceId.split('_').map(str => (str === 'LEVEL1') ? 'LEVEL' : str).join('_');
//     } else {
//         if (!resourceId.includes('_FISH_') && !resourceId.includes('_ALCHEMY_')) {
//             obj.foodConsumption += +resource["@count"] * foodConsumptionCount;
//         }
//     }
//     obj[resourceId] = +resource["@count"];
// }

// const fetchItemNames = async () => {
//     let response = await fetch(urlLocalization);
//
//     if (response.ok) {
//         let buffer = await response.json();
//
//         for (let item of buffer) {
//             languageData.set(item['UniqueName'], item);
//         }
//     } else {
//         console.log(response.status)
//         throw new Error('');
//     }
// }

// //+
// const findItemName = (data, id) => {
//     let languageItem = data.get(id);
//
//     return {
//         ru: languageItem["LocalizedNames"]["RU-RU"].split(' ').filter(str => str !== '(знаток)').join(' '),
//         en: languageItem["LocalizedNames"]["EN-US"].split(' ').filter(str => str !== 'Adept\'s').join(' '),
//     };
// }

// //+
// const defineAOTItemParams = (shopsubcategory1, id) => {
//     if (shopsubcategory1.includes('_')) {
//         const itemType = shopsubcategory1.split('_')[1];
//         const materialType = shopsubcategory1.split('_')[0];
//         const itemClasses = {
//             plate: 'warrior',
//             cloth: 'mage',
//             leather: 'hunter',
//         }
//         if (materialType in itemClasses) {
//             return {
//                 itemType,
//                 itemClass: itemClasses[materialType],
//             }
//         }
//     }
//
//     switch (shopsubcategory1) {
//         case 'crossbow':
//         case 'sword':
//         case 'axe':
//         case 'hammer':
//         case 'mace':
//         case 'knuckles':
//             return {
//                 itemType: 'warriorWeapon',
//                 itemClass: 'warrior',
//             }
//
//         case 'shield':
//             return {
//                 itemType: 'offHand',
//                 itemClass: 'warrior',
//             }
//
//         case 'cursestaff':
//         case 'firestaff':
//         case 'froststaff':
//         case 'holystaff':
//         case 'arcanestaff':
//             return {
//                 itemType: 'mageWeapon',
//                 itemClass: 'mage',
//             }
//
//         case 'orb':
//         case 'book':
//         case 'totem':
//             return {
//                 itemType: 'offHand',
//                 itemClass: 'mage',
//             }
//
//         case 'bow':
//         case 'naturestaff':
//         case 'dagger':
//         case 'spear':
//         case 'quarterstaff':
//             return {
//                 itemType: 'hunterWeapon',
//                 itemClass: 'hunter',
//             }
//
//         case 'torch': {
//             const params = {itemType: 'offHand'}
//             if (id.includes('CENSER_AVALON')) {
//                 params.itemClass = 'mage';
//             } else {
//                 params.itemClass = 'hunter';
//             }
//             return params;
//         }
//
//         case 'demolitionhammer':
//         case 'pickaxe':
//         case 'sickle':
//         case 'skinningknife':
//         case 'stonehammer':
//         case 'woodaxe':
//         case 'fishing':
//         case 'fibergatherer_helmet':
//         case 'fibergatherer_armor':
//         case 'fibergatherer_shoes':
//         case 'fishgatherer_helmet':
//         case 'fishgatherer_armor':
//         case 'fishgatherer_shoes':
//         case 'hidegatherer_helmet':
//         case 'hidegatherer_armor':
//         case 'hidegatherer_shoes':
//         case 'oregatherer_helmet':
//         case 'oregatherer_armor':
//         case 'oregatherer_shoes':
//         case 'rockgatherer_helmet':
//         case 'rockgatherer_armor':
//         case 'rockgatherer_shoes':
//         case 'woodgatherer_helmet':
//         case 'woodgatherer_armor':
//         case 'woodgatherer_shoes':
//             return {
//                 itemType: 'tools',
//                 itemClass: 'toolmaker',
//             }
//
//         case 'cape':
//             return {
//                 itemType: 'tools',
//                 itemClass: 'toolmaker',
//             }
//
//         case 'bag':
//             return {
//                 itemType: 'tools',
//                 itemClass: 'toolmaker',
//             }
//
//         default:
//             return {
//                 itemType: null,
//                 itemClass: null,
//             }
//     }
// }

// //+
// const createItem = (data, category) => {
//     for (let item of data) {
//         if ('craftingrequirements' in item) {
//             const shopsubcategory1 = item['@shopsubcategory1'];
//             const craftResources = item.craftingrequirements?.[0]?.['craftresource'] || item.craftingrequirements?.['craftresource'];
//             let ID = item['@uniquename'];
//             const bodyId = ID.split('_').filter((_, index) => index > 1).join('_') || ID.split('_').filter((_, index) => index > 0).join('_');
//             let itemCategory = ID.split('_')[1];
//             if (item['@tier'] !== '4' || !category.includes(shopsubcategory1) || !itemCategories.includes(itemCategory) || (ID.includes('TOOL') && ID.includes('AVALON'))) continue;
//             if (craftResources) {
//                 const {itemType, itemClass} = defineAOTItemParams(shopsubcategory1, ID);
//                 const obj = {
//                     itemId: bodyId,
//                     itemNode: shopsubcategory1,
//                     itemName: findItemName(languageData, ID),
//                     foodConsumption: 0,
//                     itemType,
//                     itemClass,
//                     itemExample: itemExamples[itemCategory]?.includes(bodyId) || false,
//                 }
//
//                 if (Array.isArray(craftResources)) {
//                     for (let resource of craftResources) {
//                         buildingResourceObjectHandler(resource, itemCategory, obj)
//                     }
//                 } else {
//                     buildingResourceObjectHandler(craftResources, itemCategory, obj);
//                 }
//                 items.craftItems[itemCategory].push(obj);
//             }
//         }
//     }
// }

// //+
// const createConsumableItem = (data, category) => {
//     for (let item of data) {
//         if ('enchantments' in item) {
//             const shopsubcategory1 = item['@shopsubcategory1'];
//             if (+item['@tier'] < 4 || !category.includes(shopsubcategory1)) continue;
//             const craftResources = item.enchantments?.enchantment[0]?.['craftingrequirements']['craftresource'];
//             const itemId = item["@uniquename"];
//             if (craftResources) {
//                 let obj = {
//                     itemId,
//                     foodConsumption: 0,
//                     amountCrafted: +item['craftingrequirements']?.['@amountcrafted'],
//                 };
//
//                 if (!(itemId in items.consumablesName)) {
//                     items.consumablesName[itemId] = null;
//                 }
//
//                 if (Array.isArray(craftResources)) {
//                     for (let resource of craftResources) {
//                         buildConsumableResourceObjectHandler(resource, obj)
//                     }
//                 } else {
//                     buildConsumableResourceObjectHandler(craftResources, obj)
//                 }
//
//                 items.consumablesCraftItems[shopsubcategory1].push(obj);
//             }
//         }
//     }
// }

// //+
// const createConsumablesName = (AOTConsumablesName) => {
//     for (let itemId in AOTConsumablesName) {
//         if (AOTConsumablesName[itemId] === null) {
//             let languageItem = languageData.get(itemId);
//
//             AOTConsumablesName[itemId] = {
//                 ru: languageItem["LocalizedNames"]["RU-RU"],
//                 en: languageItem["LocalizedNames"]["EN-US"],
//             }
//         }
//     }
// }

// const fetchItems = async () => {
//     let response = await fetch(urlItems);
//
//     if (response.ok) {
//         itemData = await response.json();
//     } else {
//         console.log(response.status)
//         throw new Error('');
//     }
// }
//
// fetchItemNames()
//     .then(() => fetchItems())
//     .then(() => {
//         createItem(itemData.items.equipmentitem, equipmentCategories);
//         createItem(itemData.items.weapon, weaponCategories);
//         createConsumableItem(itemData.items.consumableitem, consumableCategories)
//         createConsumablesName(items.consumablesName);
//     })
//     .then(() => {
//         fs.writeFile(path.resolve(__dirname, 'data.js'), JSON.stringify(items), (err) => {
//             if (err) throw err;
//         })
//     })
