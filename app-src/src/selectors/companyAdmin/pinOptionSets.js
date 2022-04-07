export const selectPinOptionSets = state => state.companyAdmin.pinOptionSetsReducer.sets;
export const selectPinOptionSetsArr = state => Object.values(selectPinOptionSets(state));
export const selectPinOptionSetsIsFetching = state =>
    state.companyAdmin.pinOptionSetsReducer.isFetching;
export const selectPinOptionSetsFetchError = state =>
    state.companyAdmin.pinOptionSetsReducer.fetchError;
export const selectPinOptionSetsIsPosting = state =>
    state.companyAdmin.pinOptionSetsReducer.isPosting;
export const selectPinOptionSetsPostError = state =>
    state.companyAdmin.pinOptionSetsReducer.postError;
export const selectPinOptionSetsPostSuccess = state =>
    state.companyAdmin.pinOptionSetsReducer.postSuccess;
