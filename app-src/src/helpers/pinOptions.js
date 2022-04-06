export const getVersionNameForPinOption = (pinOptionID, pinVersions) => {
    const validPinVersions = pinVersions.filter(version => version.pinOptionID === pinOptionID);
    const sortByRevision = validPinVersions.sort((a, b) => b.revisionNumber - a.revisionNumber);
    const latestVersion = sortByRevision[0];

    return latestVersion.name;
};
