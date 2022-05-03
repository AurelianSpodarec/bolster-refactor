import contentTypes from '../filterList/contentTypes';

export const itemTypeIDs = {
    sites: 'siteID',
    buildings: 'buildingID',
    floors: 'floorID',
    drawings: 'drawingID',
    histories: 'pinHistoryID',
    installations: 'representsPinHistoryAnswerValueIDs', // will be an array - store as JSON.stringify
};

export const getContentTypeFromItem = item => {
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return contentTypes.Building;
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return contentTypes.Floor;
    if (Object.prototype.hasOwnProperty.call(item, 'histories')) return contentTypes.Drawing;
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return contentTypes.History;
    if (Object.prototype.hasOwnProperty.call(item, 'measurement')) return contentTypes.Installation;
    return null;
};
export const getDataKeyFromItem = item => {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return 'buildings';
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return 'floors';
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return 'drawings';
    if (Object.prototype.hasOwnProperty.call(item, 'histories')) return 'histories';
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return 'installations';
    return undefined;
};
export const getItemType = item => {
    if (Object.prototype.hasOwnProperty.call(item, 'buildings')) return 'sites';
    if (Object.prototype.hasOwnProperty.call(item, 'floors')) return 'buildings';
    if (Object.prototype.hasOwnProperty.call(item, 'drawings')) return 'floors';
    if (Object.prototype.hasOwnProperty.call(item, 'histories')) return 'drawings';
    if (Object.prototype.hasOwnProperty.call(item, 'installations')) return 'histories';
    if (Object.prototype.hasOwnProperty.call(item, 'measurement')) return 'installations';
    return undefined;
};
export const isItemSelected = (item, selectedItems) => {
    const itemType = getItemType(item);

    if (itemType === 'buildings')
        return selectedItems.buildings.includes(item[itemTypeIDs[itemType]]);
    if (itemType === 'floors') return selectedItems.floors.includes(item[itemTypeIDs[itemType]]);
    if (itemType === 'drawings')
        return selectedItems.drawings.includes(item[itemTypeIDs[itemType]]);
    if (itemType === 'histories')
        return selectedItems.histories.includes(item[itemTypeIDs[itemType]]);
    if (itemType === 'installations')
        return selectedItems.installations.includes(item[itemTypeIDs[itemType]]);
    return false;
};

export const getSelectionKeyForItem = item => {
    const itemType = getItemType(item);
    if (itemType === 'installations') return JSON.stringify(item[itemTypeIDs[itemType]]);
    return item[itemTypeIDs[itemType]];
};
