export const selectAlerts = state => state.companyAdmin.alertsReducer.alerts;
export const alertsIsFetching = state => state.companyAdmin.alertsReducer.isFetching;
export const alertsError = state => state.companyAdmin.alertsReducer.error;
export const alertsIsPosting = state => state.companyAdmin.alertsReducer.isPosting;
export const alertsPostSuccess = state => state.companyAdmin.alertsReducer.postSuccess;
export const alertsPostError = state => state.companyAdmin.alertsReducer.postError;
