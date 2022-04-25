export const selectPinOptions = state => state.superAdmin.pinOptionsReducer.options;
export const selectPinOptionsArr = state => Object.values(selectPinOptions(state));
export const selectPinOptionsIsFetching = state => state.superAdmin.pinOptionsReducer.isFetching;
export const selectPinOptionsFetchError = state => state.superAdmin.pinOptionsReducer.fetchError;
export const selectPinOptionsIsPosting = state => state.superAdmin.pinOptionsReducer.isPosting;
export const selectPinOptionsPostError = state => state.superAdmin.pinOptionsReducer.postError;
export const selectPinOptionsPostSuccess = state => state.superAdmin.pinOptionsReducer.postSuccess;
