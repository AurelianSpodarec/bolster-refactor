import moment from 'moment';
import { DATE_TIME_DEFAULTS } from 'constants/companyAdmin/enums';
import { useEffect } from 'react';

export function convertArrToObj(arr, field = 'id') {
    return arr.reduce((acc, item) => {
        acc[item[field]] = item;
        return acc;
    }, {});
}

export function getSelectedCompanyForClient() {
    return parseInt(localStorage.getItem('selectedCompany'));
}

export function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export const nameSort = (a, b) => {
    if (a.userFirstName === b.userFirstName) {
        return a.userLastName.toLowerCase() > b.userLastName.toLowerCase();
    } else return a.userFirstName.toLowerCase() > b.userFirstName.toLowerCase();
};

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

/**
 * @param {object} obj - enum in format {KEY: 1}
 * @returns {object} formatted enum, object suitable for <Select /> {label: Key, value: 1}
 */
export const enumFormatCapitalKeys = obj =>
    Object.entries(obj).map(([label, value]) => ({
        value: +value || value,
        label: capitaliseWords(label)
    }));

export const capitaliseWord = word =>
    `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;

export const capitaliseWords = words => words.split(' ').map(capitaliseWord);

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

export const caseInsensitiveEquals = (str1, str2) =>
    str1.toLowerCase() === str2.toLowerCase();

export const caseInsensitiveIncludes = (str1, str2) =>
    str1.toLowerCase() === str2.toLowerCase();

// call this as the argument to a .sort() on an array
export const hierarchySort = (a, b) => a.sort - b.sort;

// lifecycle hook tests

// ? pass in a function to call on mount
export function componentDidMount(cb) {
    useEffect(() => {
        cb();
    }, []);
}

// ? pass in a function to call before unmount
export function componentWillUnmount(cb) {
    useEffect(() => {
        return () => cb();
    }, []);
}

// ? pass a function, dependencies - if the dependencies have specific values these should be specified and checked in the cb function
// ie. checking for an error, pass [error] as dependency and in the cb check if (error) {doTheThing()}
export function componentDidUpdate(cb, dependencies = []) {
    useEffect(() => {
        cb();
    }, dependencies);
}

export function getCompanyColour(colourCode) {
    const localColour = localStorage.getItem('colourCode');

    if (colourCode) {
        return colourCode;
    } else if (localColour) {
        return localColour;
    } else {
        return '#E10512';
    }
}

export function getBolsterColour() {
    return '#E10512';
}

export const momentComparisonFormat = 'YYYY-MM-DD';

export const roundToTwoPlacesMax = num => {
    const rounded = Math.round(num * 100) / 100;

    if (isNaN(rounded)) return 0;
    return rounded;
};

export const deepEquals = (first, second) => {
    // shouldn't be used for deep comparison of primitives but might as well account for it
    // also works if the same object reference is passed twice for whatever reason
    if (first === second) return true;

    if (typeof first !== typeof second) return false;

    if (first instanceof Date) {
        return second instanceof Date
            ? first.getTime() === second.getTime()
            : false;
    }
    if (
        (first instanceof RegExp && second instanceof RegExp) ||
        (first instanceof Function && second instanceof Function)
    ) {
        return first.ToString() === second.toString();
    }

    const firstEntries = Object.entries(first);
    const secondEntries = Object.entries(second);
    // basic check to see if they have same number of keys
    if (firstEntries.length !== secondEntries.length) return false;

    firstEntries.forEach(([firstKey, firstVal], index) => {
        const [secondKey, secondVal] = secondEntries[index];

        // recursive check for nested objects, arrays
        if (typeof firstVal === 'object' && typeof secondVal === 'object') {
            if (!deepEquals(firstVal, secondVal)) return false;
        }
        if (firstKey !== secondKey || firstVal !== secondVal) return false;
    });
    return true;
};
