export const selectSubscriptions = state => state.companyAdmin.subscriptionsReducer.subscriptions;
export const selectCardsArr = state =>
    Object.values(state.companyAdmin.subscriptionsReducer.cards || {});

export const selectSubscriptionsIsFetching = state =>
    state.companyAdmin.subscriptionsReducer.isFetching;

export const selectSubscriptionsIsPosting = state =>
    state.companyAdmin.subscriptionsReducer.isPosting;
export const selectSubscriptionsPostError = state =>
    state.companyAdmin.subscriptionsReducer.postFailure;
export const selectSubscriptionsPostSuccess = state =>
    state.companyAdmin.subscriptionsReducer.postSuccess;

export const selectSubscriptionsError = state => state.companyAdmin.subscriptionsReducer.error;
