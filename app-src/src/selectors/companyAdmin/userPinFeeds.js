export const selectUserPinFeedsIsFetching = state =>
    state.companyAdmin.userPinFeedsReducer.isFetching;
export const selectUserPinFeedsFetchError = state => state.companyAdmin.userPinFeedsReducer.error;
export const selectUserPinFeeds = state => state.companyAdmin.userPinFeedsReducer.userPinFeeds;
