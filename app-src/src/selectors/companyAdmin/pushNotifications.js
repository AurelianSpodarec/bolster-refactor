export const selectPushNotifications = state =>
    state.companyAdmin.pushNotificationsReducer.pushNotifications;
export const selectPushNotification = (state, id) =>
    state.companyAdmin.pushNotificationsReducer.pushNotifications[id] || {};

export const selectPushNotificationsIsFetching = state =>
    state.companyAdmin.pushNotificationsReducer.isFetching;
export const selectPushNotificationsFetchError = state =>
    state.companyAdmin.pushNotificationsReducer.fetchError;

export const selectPushNotificationsIsPosting = state =>
    state.companyAdmin.pushNotificationsReducer.isPosting;
export const selectPushNotificationsPostError = state =>
    state.companyAdmin.pushNotificationsReducer.postError;
export const selectPushNotificationsPostSuccess = state =>
    state.companyAdmin.pushNotificationsReducer.postSuccess;
