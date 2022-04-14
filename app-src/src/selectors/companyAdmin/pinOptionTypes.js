export const selectPinOptionTypes = state => state.companyAdmin.pinOptionTypesReducer.types;
export const selectPinOptionTypesArr = state => Object.values(selectPinOptionTypes(state));
export const selectPinOptionType = (state, id) =>
    state.companyAdmin.pinOptionTypesReducer.types[id];
export const selectPinOptionTypesIsFetching = state =>
    state.companyAdmin.pinOptionTypesReducer.isFetching;
export const selectPinOptionTypesFetchError = state =>
    state.companyAdmin.pinOptionTypesReducer.fetchError;

export const selectPinOptionTypesSelectedTabID = state =>
    state.companyAdmin.pinOptionTypesReducer.selectedTabID;
