export const selectAdminPushNotifications = state =>
    state.superAdmin.pushNotificationsReducer.pushNotifications;
export const selectAdminPushNotification = (state, id) =>
    state.superAdmin.pushNotificationsReducer.pushNotifications[id] || {};

export const selectAdminPushNotificationsIsFetching = state =>
    state.superAdmin.pushNotificationsReducer.isFetching;
export const selectAdminPushNotificationsFetchError = state =>
    state.superAdmin.pushNotificationsReducer.fetchError;

export const selectAdminPushNotificationsIsPosting = state =>
    state.superAdmin.pushNotificationsReducer.isPosting;
export const selectAdminPushNotificationsPostError = state =>
    state.superAdmin.pushNotificationsReducer.postError;
export const selectAdminPushNotificationsPostSuccess = state =>
    state.superAdmin.pushNotificationsReducer.postSuccess;
