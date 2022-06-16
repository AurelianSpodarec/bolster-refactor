export const selectSubscriptions = state => state.companyAdmin.subscriptionsReducer.subscriptions;

export const selectSubscriptionsIsPosting = state =>
    state.companyAdmin.subscriptionsReducer.isPosting;
export const selectSubscriptionsPostError = state =>
    state.companyAdmin.subscriptionsReducer.postFailure;
export const selectSubscriptionsPostSuccess = state =>
    state.companyAdmin.subscriptionsReducer.postSuccess;

export const selectSubscriptionsError = state => state.companyAdmin.subscriptionsReducer.error;
