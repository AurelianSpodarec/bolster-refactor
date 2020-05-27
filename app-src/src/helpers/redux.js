import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';

export const removeDeletedDocumentVersion = (documentsObj, documentID, versionID) => {
    const updatedVersionsArr = documentsObj[documentID].versions.filter(
        version => version.id !== versionID,
    );

    return {
        ...documentsObj,
        [documentID]: { ...documentsObj[documentID], versions: updatedVersionsArr },
    };
};

export const formatAllOptionValuesByManufacturer = optionValues => {
    return optionValues.reduce((acc, curOption) => {
        if (acc[curOption.manufacturerID]) {
            acc[curOption.manufacturerID] = {
                ...acc[curOption.manufacturerID],
                [curOption.id]: curOption,
            };
        } else {
            acc[curOption.manufacturerID] = { [curOption.id]: curOption };
        }
        return acc;
    }, {});
};

export function fetchManufacturerPinOptions(
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
) {
    const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
        return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
    });

    const fn = function fetchManufacturers(pinOptionType) {
        return fetchManufacturersByPinOptionType(pinOptionType);
    };

    const actions = pinOptionTypes.map(fn);

    return new Promise((resolve, reject) => {
        try {
            Promise.all(actions)
                .then(() => {
                    return fetchAllOptionValues();
                })
                .then(() => {
                    resolve();
                });
        } catch {
            reject();
        }
    });
}
