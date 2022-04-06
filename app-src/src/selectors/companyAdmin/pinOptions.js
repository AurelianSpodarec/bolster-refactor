export const selectPinOptions = state => state.companyAdmin.pinOptionsReducer.options;
export const selectPinOptionsArr = state => Object.values(selectPinOptions(state));
export const selectPinOptionsIsFetching = state => state.companyAdmin.pinOptionsReducer.isFetching;
export const selectPinOptionsFetchError = state => state.companyAdmin.pinOptionsReducer.fetchError;
