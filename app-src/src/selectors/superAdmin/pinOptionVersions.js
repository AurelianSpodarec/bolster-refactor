export const selectPinOptionVersions = state => state.superAdmin.pinOptionVersionsReducer.versions;
export const selectPinOptionVersionsArr = state => Object.values(selectPinOptionVersions(state));
export const selectLatestVersionForPinOption = (state, pinOptionID) => {
    const pinVersions = selectPinOptionVersionsArr(state);
    const validPinVersions = pinVersions.filter(version => version.pinOptionID === pinOptionID);

    const sortByRevision = validPinVersions.sort((a, b) => b.revisionNumber - a.revisionNumber);
    const latestVersion = sortByRevision[0];

    return latestVersion || {};
};
export const selectPinOptionVersionsIsFetching = state =>
    state.superAdmin.pinOptionVersionsReducer.isFetching;
export const selectPinOptionVersionsFetchError = state =>
    state.superAdmin.pinOptionVersionsReducer.fetchError;
export const selectPinOptionVersionsIsPosting = state =>
    state.superAdmin.pinOptionVersionsReducer.isPosting;
export const selectPinOptionVersionsPostError = state =>
    state.superAdmin.pinOptionVersionsReducer.postError;
export const selectPinOptionVersionsPostSuccess = state =>
    state.superAdmin.pinOptionVersionsReducer.postSuccess;
