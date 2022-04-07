export const selectPinOptionVersions = state =>
    state.companyAdmin.pinOptionVersionsReducer.versions;
export const selectPinOptionVersionsArr = state => Object.values(selectPinOptionVersions(state));
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
