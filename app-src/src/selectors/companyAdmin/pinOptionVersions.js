export const selectPinOptionVersions = state =>
    state.companyAdmin.pinOptionVersionsReducer.versions;
export const selectPinOptionVersionsArr = state => Object.values(selectPinOptionVersions(state));
export const selectLatestVersionForPinOption = (state, pinOptionID) => {
    const pinVersions = selectPinOptionVersionsArr(state);
    const validPinVersions = pinVersions.filter(version => version.pinOptionID === pinOptionID);

    const sortByRevision = validPinVersions.sort((a, b) => b.revisionNumber - a.revisionNumber);
    const latestVersion = sortByRevision[0];

    return latestVersion || {};
};
export const selectPinOptionVersionsIsFetching = state =>
    state.companyAdmin.pinOptionVersionsReducer.isFetching;
export const selectPinOptionVersionsFetchError = state =>
    state.companyAdmin.pinOptionVersionsReducer.fetchError;
export const selectPinOptionVersionsIsPosting = state =>
    state.companyAdmin.pinOptionVersionsReducer.isPosting;
export const selectPinOptionVersionsPostError = state =>
    state.companyAdmin.pinOptionVersionsReducer.postError;
export const selectPinOptionVersionsPostSuccess = state =>
    state.companyAdmin.pinOptionVersionsReducer.postSuccess;
