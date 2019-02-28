export function convertArrToObj(arr, field = 'id') {
    return arr.reduce((acc, item) => {
        acc[field] = item;
        return acc;
    }, {});
}
