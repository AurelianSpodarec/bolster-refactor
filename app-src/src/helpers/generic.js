import moment from 'moment';
import { DATE_TIME_DEFAULTS } from 'constants/companyAdmin/enums';

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

export function isEmpty(item) {
    if (Array.isArray(item)) return !item.length;
    if (typeof item === 'string') return !item.length;
    if (typeof item === 'object') return isObjEmpty(item);
    if (typeof item === 'number') return false;

    return !item;
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

export function areArraysEqual(arr1, arr2) {
    if (!arr1 || !arr2) return arr1 === arr2;
    return (
        arr1.length === arr2.length &&
        arr1.every(item => arr2.includes(item)) &&
        arr2.every(item => arr1.includes(item))
    );
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

export function swapItemSorts(obj, key1, key2) {
    return {
        ...obj,
        [key1]: updateObj(obj[key1], 'sort', obj[key2].sort),
        [key2]: updateObj(obj[key2], 'sort', obj[key1].sort)
    };
}

// for dropdowncontainer component
export function convertEnumToDropdownOptions(obj) {
    const options = Object.keys(obj).map(key => ({
        value: key,
        text: obj[key]
    }));

    return convertArrToObj(options, 'value');
}

// for the NewSelect component
export const enumFormat = obj =>
    Object.entries(obj).map(([value, label]) => ({
        value: +value || value,
        label
    }));

// For numbers without decimal
export const formatNumber = num => Number(num).toLocaleString('en-us');

// for decimal .00
export const formatCurrency = num =>
    num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

const getOffsetValue = ({ offset }) =>
    Number(offset.slice(4, 10).replace(':', '')) || 0;
const sortByOffset = (a, b) => getOffsetValue(a) - getOffsetValue(b);

export const sortTimezones = timezonesArr =>
    [...timezonesArr].sort(sortByOffset);

export const formatDate = date =>
    moment(date).format(DATE_TIME_DEFAULTS.DATETIME);

// boolean byID for if using an array of objects with IDs
export const removeDuplicates = (arr, byID) =>
    arr.filter((item, index, arr) => {
        if (byID) {
            return arr.findIndex(({ id }) => id === item.id) === index;
        } else return arr.indexOf(item) === index;
    });

export function moveItem(arr, id, index) {
    const sortedItems = arr
        .filter(item => item.id !== id)
        .sort((a, b) => a.sort - b.sort);
    const item = arr.find(item => item.id === id);

    sortedItems.splice(index, 0, item);
    return sortedItems.map((item, i) => ({ ...item, sort: i + 1 }));
}
