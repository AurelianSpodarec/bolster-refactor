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
