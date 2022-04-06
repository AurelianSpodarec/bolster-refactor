export const selectPinOptionVersions = state =>
    state.companyAdmin.pinOptionVersionsReducer.versions;
export const selectPinOptionVersionsArr = state => Object.values(selectPinOptionVersions(state));
export const selectPinOptionVersionsIsFetching = state =>
    state.companyAdmin.pinOptionVersionsReducer.isFetching;
export const selectPinOptionVersionsFetchError = state =>
    state.companyAdmin.pinOptionVersionsReducer.fetchError;
