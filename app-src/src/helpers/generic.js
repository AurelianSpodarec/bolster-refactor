export function convertArrToObj(arr, field = 'id') {
    return arr.reduce((acc, item) => {
        acc[item[field]] = item;
        return acc;
    }, {});
}

export function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export function updateObj(origObj, key, newItem) {
    return {
        ...origObj,
        [key]: newItem
    };
}

export function removeObjItem(obj, key) {
    const {
        [key]: removedItem, // eslint-disable-line
        ...rest
    } = obj;

    return rest;
}

export function removeArrItem(arr, index) {
    return [[...arr.slice(0, index), ...arr.slice(index + 1)]];
}

export function updateMultipleKeys(origObj, keys, newValues) {
    return keys.reduce(
        (newObj, key, i) => {
            newObj[key] = newValues[i];
            return newObj;
        },
        { ...origObj }
    );
}

export function sortArrayByKeyAndOrder(array, key, order) {
    return [...array].sort((a, b) => {
        const value = order === 'asc' ? 1 : -1;
        return a[key] > b[key] ? value : a[key] < b[key] ? -value : 0;
    });
}
