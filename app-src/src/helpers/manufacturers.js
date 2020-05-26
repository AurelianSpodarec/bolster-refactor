import { isObjEmpty } from './generic';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

export const formatOptions = options => {
    return options.map(option => {
        return {
            ...option,
            text: option.name,
            value: option.id,
            isEnabled: option.isEnabled,
        };
    });
};

// ===================== CREATING OPTION VALUES AND MANUFACTURER OPTIONS IF NOT SET ABOVE ===========
export const createManufacturerOptionList = manufacturers => {
    if (!isObjEmpty(manufacturers)) {
        return Object.values(DROPDOWN_OPTIONS).reduce((acc, { reduxKey }) => {
            if (manufacturers[reduxKey]) {
                const manufacturerOptions = formatOptions(Object.values(manufacturers[reduxKey]));

                acc = [...acc, ...manufacturerOptions];
            }

            return acc;
        }, []);
    }
    return [];
};

export const createPreselectedManufacturersList = manufacturerList => {
    return manufacturerList.reduce((acc, manufacturer) => {
        if (manufacturer.isEnabled) {
            acc.push(String(manufacturer.value));
        }

        return acc;
    }, []);
};

export const createOptionValuesList = (optionValues, subscriptionServiceIDs) => {
    return Object.entries(optionValues).reduce((acc, [manufacturerID, options]) => {
        const formattedOptionValues = formatOptions(Object.values(options));
        const filteredOptionValues = formattedOptionValues.filter(option =>
            shouldOptionValueBeIncluded(option.serviceIDs, subscriptionServiceIDs),
        );
        acc = { ...acc, [manufacturerID]: filteredOptionValues };
        return acc;
    }, {});
};

export const createPreselectedOptionValuesList = optionValuesList => {
    let selectedOptionValues = [];
    Object.values(optionValuesList).forEach(optionList => {
        const optionListSelectedIDs = optionList.reduce((acc, optionValue) => {
            if (optionValue.isEnabled) {
                acc.push(String(optionValue.value));
            }

            return acc;
        }, []);
        selectedOptionValues = selectedOptionValues.concat(optionListSelectedIDs);
    });
    return selectedOptionValues;
};

export const shouldOptionValueBeIncluded = (serviceIDs, subscriptionServiceIDs) => {
    return serviceIDs.some(id => subscriptionServiceIDs.includes(id));
};

// ======================== CREATING OPTION VALUES AND MANUFACTURING OPTIONS IF DEFINED IN HIERARCHY ABOVE ========

export const createHierarchyPreselectedManufacturersList = (
    manufacturerList,
    optionValues,
    selectedOptionValues,
) => {
    return manufacturerList.reduce((acc, manufacturer) => {
        const relevantOptionValues = optionValues[manufacturer.id];
        if (relevantOptionValues) {
            const hasManufacturerOptionValues = Object.values(relevantOptionValues).some(option =>
                selectedOptionValues.includes(String(option.id)),
            );
            if (hasManufacturerOptionValues) {
                acc.push(String(manufacturer.id));
            }
        }

        return acc;
    }, []);
};

// remove defaults for option values that don't have a selected manufacturer on submit
export const removeUnusedManufacturerDefaults = hierarchy => {
    const {
        selectedOptionValues,
        optionValuesOptions,
        selectedManufacturerOptions,
        setManufacturersForHierarchy,
    } = hierarchy;

    if (setManufacturersForHierarchy) {
        const possibleOptionValues = Object.entries(optionValuesOptions).reduce(
            (acc, [manufacturerID, optionList]) => {
                if (selectedManufacturerOptions.includes(manufacturerID)) {
                    const optionsToInclude = optionList.map(option => option.id);
                    acc = [...acc, ...optionsToInclude];
                }
                return acc;
            },
            [],
        );

        return selectedOptionValues.filter(option => possibleOptionValues.includes(Number(option)));
    } else {
        return null;
    }
};
