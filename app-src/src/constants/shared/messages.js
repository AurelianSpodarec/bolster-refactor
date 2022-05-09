import { isLowMemory, isLowStorage, isMinMemory } from 'helpers/generic';

export const getLowMemoryMessage = (memory, storage) => {
    const isRamLow = !!memory && isLowMemory(memory);
    const isRamMin = !!memory && isMinMemory(memory);
    const isStorageLow = !!storage && isLowStorage(storage);
    console.log(memory);
    console.log(storage);

    if (isRamLow && isStorageLow) {
        return 'This device has RAM lower than 3GB and low storage space. It may struggle to run the Bolster App, create new pins or down sync new data';
    }
    if (isRamLow) {
        return 'This device has RAM lower than 3GB and may struggle to run the Bolster App.';
    }
    if (isRamMin) {
        return 'This device has 3GB RAM which is our minimum spec.';
    }
    if (isStorageLow || !memory || !storage) {
        return 'This device has low storage space. It may struggle to create new pins or down sync new data.';
    }

    return null;
};
