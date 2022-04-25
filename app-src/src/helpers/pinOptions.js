import { updateObjMultiple } from './generic';

export const getVersionForPinOption = (pinOptionID, pinVersions) => {
    const validPinVersions = pinVersions.filter(version => version.pinOptionID === pinOptionID);
    const sortByRevision = validPinVersions.sort((a, b) => b.revisionNumber - a.revisionNumber);
    const latestVersion = sortByRevision[0];

    return latestVersion;
};

export const getVersionForPinOptionDocument = (id, allDocumentsVersions) => {
    const validVersions = allDocumentsVersions.filter(
        version => version.pinOptionDocumentID === id,
    );
    const sortByDate = validVersions.sort((a, b) => a.createdAt - b.createdAt);

    const latestVersion = sortByDate[0];

    return latestVersion;
};

export const getVersionNameForPinOption = (pinOptionID, pinVersions) => {
    const latestVersion = getVersionForPinOption(pinOptionID, pinVersions);

    return latestVersion ? latestVersion.name : '';
};

export const updateObjDefaultOnRequest = (state, newDefault, oldDefault) => {
    const itemsToUpdate = [];

    itemsToUpdate.push({
        ...newDefault,
        isDefault: true,
    });

    if (oldDefault) {
        itemsToUpdate.push({
            ...oldDefault,
            isDefault: false,
        });
    }

    return updateObjMultiple(state, itemsToUpdate);
};

export const updateObjDefaultOnFailure = (state, newDefault, oldDefault) => {
    const itemsToUpdate = [newDefault];

    if (oldDefault) {
        itemsToUpdate.push(oldDefault);
    }

    return updateObjMultiple(state, itemsToUpdate);
};
