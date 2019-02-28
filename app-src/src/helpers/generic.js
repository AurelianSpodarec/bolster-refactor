export function convertArrToObj(arr, field = 'id') {
    return arr.reduce((acc, item) => {
        acc[field] = item;
        return acc;
    }, {});
}

export function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}
