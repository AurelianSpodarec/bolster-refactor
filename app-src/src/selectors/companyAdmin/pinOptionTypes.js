export const selectPinOptionTypes = state => state.companyAdmin.pinOptionTypesReducer.types;
export const selectPinOptionTypesIsFetching = state =>
    state.companyAdmin.pinOptionTypesReducer.isFetching;
export const selectPinOptionTypesError = state => state.companyAdmin.pinOptionTypesReducer.error;
