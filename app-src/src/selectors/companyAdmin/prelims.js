export const selectPrelimsArr = state =>
    Object.values(state.companyAdmin.prelimsReducer.prelims || {});
export const selectSinglePrelim = (state, id) => state.companyAdmin.prelimsReducer.prelims[id];
export const selectPrelimsIsFetching = state => state.companyAdmin.prelimsReducer.isFetching;
export const selectPrelimsFetchError = state => state.companyAdmin.prelimsReducer.error;

export const selectPrelimIsPosting = state => state.companyAdmin.prelimsReducer.isPosting;
export const selectPrelimPostError = state => state.companyAdmin.prelimsReducer.postError;
export const selectPrelimPostSuccess = state => state.companyAdmin.prelimsReducer.postSuccess;
