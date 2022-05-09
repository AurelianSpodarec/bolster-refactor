export const selectPinHistoriesIsFetching = state =>
    state.companyAdmin.pinHistoriesReducer.isFetching;
export const selectPinHistoriesFetchError = state => state.companyAdmin.pinHistoriesReducer.error;
export const selectPinHistories = state => state.companyAdmin.pinHistoriesReducer.histories;
export const selectPinHistory = (state, id) => state.companyAdmin.pinHistoriesReducer.histories[id];
