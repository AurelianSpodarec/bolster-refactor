export const selectPinOptionSets = state => state.companyAdmin.pinOptionSetsReducer.sets;
export const selectPinOptionSetsIsFetching = state =>
    state.companyAdmin.pinOptionSetsReducer.isFetching;
export const selectPinOptionSetsError = state => state.companyAdmin.pinOptionSetsReducer.error;
