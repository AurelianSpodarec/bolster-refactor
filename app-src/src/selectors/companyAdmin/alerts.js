export const selectAlerts = state => state.companyAdmin.alertsReducer.alerts;
export const selectAlert = (state, id) => state.companyAdmin.alertsReducer.alerts[id];
export const alertsIsFetching = state => state.companyAdmin.alertsReducer.isFetching;
export const alertsError = state => state.companyAdmin.alertsReducer.error;
export const alertsIsPosting = state => state.companyAdmin.alertsReducer.isPosting;
export const alertsPostSuccess = state => state.companyAdmin.alertsReducer.postSuccess;
export const alertsPostError = state => state.companyAdmin.alertsReducer.postError;
export const selectHierarchyAlerts = state => state.companyAdmin.alertsReducer.hierarchyAlerts;
export const selectHierarchyAlert = (state, id) =>
    state.companyAdmin.alertsReducer.hierarchyAlerts[id];
