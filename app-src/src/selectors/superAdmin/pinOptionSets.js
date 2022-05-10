export const selectPinOptionSets = state => state.superAdmin.pinOptionSetsReducer.sets;
export const selectPinOptionSetsArr = state => Object.values(selectPinOptionSets(state));
export const selectPinOptionSet = (state, setID) =>
    state.superAdmin.pinOptionSetsReducer.sets[setID] || {};
export const selectPinOptionDefaultSet = (state, typeID) =>
    selectPinOptionSetsArr(state).find(set => set.pinOptionTypeID === typeID && set.isDefault);
export const selectPinOptionSetsIsFetching = state =>
    state.superAdmin.pinOptionSetsReducer.isFetching;
export const selectPinOptionSetsFetchError = state =>
    state.superAdmin.pinOptionSetsReducer.fetchError;
export const selectPinOptionSetsIsPosting = state =>
    state.superAdmin.pinOptionSetsReducer.isPosting;
export const selectPinOptionSetsPostError = state =>
    state.superAdmin.pinOptionSetsReducer.postError;
export const selectPinOptionSetsPostSuccess = state =>
    state.superAdmin.pinOptionSetsReducer.postSuccess;
export const selectPinOptionSetsIsDeleting = state =>
    state.superAdmin.pinOptionSetsReducer.isDeleting;
export const selectPinOptionSetsDeleteError = state =>
    state.superAdmin.pinOptionSetsReducer.deleteError;
export const selectPinOptionSetsDeleteSuccess = state =>
    state.superAdmin.pinOptionSetsReducer.deleteSuccess;
