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
