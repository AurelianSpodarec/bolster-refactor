export const selectPinOptionTypes = state => state.superAdmin.pinOptionTypesReducer.types;
export const selectPinOptionTypesArr = state => Object.values(selectPinOptionTypes(state));
export const selectPinOptionType = (state, id) =>
    state.superAdmin.pinOptionTypesReducer.types[id] || {};
export const selectPinOptionTypesIsFetching = state =>
    state.superAdmin.pinOptionTypesReducer.isFetching;
export const selectPinOptionTypesFetchError = state =>
    state.superAdmin.pinOptionTypesReducer.fetchError;

export const selectPinOptionTypesSelectedTabID = state =>
    state.superAdmin.pinOptionTypesReducer.selectedTabID;
