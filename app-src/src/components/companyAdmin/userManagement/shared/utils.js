import {
    getStorageString,
    isLowMemory,
    isLowStorage,
    isMinMemory,
} from '../../../../helpers/generic';

export const getDeviceNameColour = (memory, storage) => {
    const isRamLow = !!memory && isLowMemory(memory);
    const isRamMin = !!memory && isMinMemory(memory);
    const isStorageLow = !!storage && isLowStorage(storage);

    if (isRamLow || isStorageLow) {
        return 'red-text';
    } else if (isRamMin) {
        return 'warning-text';
    } else {
        return '';
    }
};

export const getTooltipRamText = (memory, storage) => {
    const isRamLow = !!memory && isLowMemory(memory);
    const isRamMin = !!memory && isMinMemory(memory);
    const isStorageLow = !!storage && isLowStorage(storage);

    if (isRamLow || isStorageLow) {
        return 'This Device does not meet the minimum specification required to run our mobile app.';
    } else if (isRamMin) {
        return 'This device may experience performance issues.';
    } else {
        return `${getStorageString(memory)} RAM`;
    }
};
