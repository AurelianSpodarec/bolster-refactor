export const selectPinOptionTypes = state => state.companyAdmin.pinOptionTypesReducer.types;
export const selectPinOptionTypesIsFetching = state =>
    state.companyAdmin.pinOptionTypesReducer.isFetching;
export const selectPinOptionTypesFetchError = state =>
    state.companyAdmin.pinOptionTypesReducer.fetchError;
