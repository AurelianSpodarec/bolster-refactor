export const selectPinOptionSets = state => state.companyAdmin.pinOptionSetsReducer.sets;
export const selectPinOptionSetsArr = state => Object.values(selectPinOptionSets(state));
export const selectPinOptionSetsIsFetching = state =>
    state.companyAdmin.pinOptionSetsReducer.isFetching;
export const selectPinOptionSetsFetchError = state =>
    state.companyAdmin.pinOptionSetsReducer.fetchError;
