export const selectPinOptionVersions = state =>
    state.companyAdmin.pinOptionVersionsReducer.versions;
export const selectPinOptionVersionsIsFetching = state =>
    state.companyAdmin.pinOptionVersionsReducer.isFetching;
export const selectPinOptionVersionsFetchError = state =>
    state.companyAdmin.pinOptionVersionsReducer.fetchError;
