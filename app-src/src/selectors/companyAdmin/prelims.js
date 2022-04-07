export const selectPrelimsArr = state =>
    Object.values(state.companyAdmin.prelimsReducer.prelims || {});
export const selectPrelimsIsFetching = state => state.companyAdmin.prelimsReducer.isFetching;
export const selectPrelimsFetchError = state => state.companyAdmin.prelimsReducer.error;
