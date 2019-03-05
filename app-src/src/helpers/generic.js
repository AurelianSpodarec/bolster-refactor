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
