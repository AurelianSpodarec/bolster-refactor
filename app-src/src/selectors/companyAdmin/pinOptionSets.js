export const selectPinOptionSets = state => state.companyAdmin.pinOptionSetsReducer.sets;
export const selectPinOptionSetsIsFetching = state =>
    state.companyAdmin.pinOptionSetsReducer.isFetching;
export const selectPinOptionSetsFetchError = state =>
    state.companyAdmin.pinOptionSetsReducer.fetchError;
