export const selectUserPinFeedIsFetching = state =>
    state.companyAdmin.userPinFeedReducer.isFetching;
export const selectUserPinFeedFetchError = state => state.companyAdmin.userPinFeedReducer.error;
export const selectUserPinFeed = state => state.companyAdmin.userPinFeedReducer.pins;
