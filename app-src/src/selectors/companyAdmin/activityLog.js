export const selectActivityLog = state => state.companyAdmin.activityLogReducer.activityLog;
export const selectActivityLogArr = state =>
    Object.values(state.companyAdmin.activityLogReducer.activityLog);
export const selectActivityLogSettings = state => state.companyAdmin.activityLogReducer.settings;
export const selectActivityLogIsFetching = state =>
    state.companyAdmin.activityLogReducer.isFetching;
export const selectActivityLogIsPosting = state => state.companyAdmin.activityLogReducer.isPosting;
export const selectActivityLogError = state => state.companyAdmin.activityLogReducer.error;
export const selectActivityLogPostError = state => state.companyAdmin.activityLogReducer.postError;
export const selectActivityLogSuccess = state => state.companyAdmin.activityLogReducer.success;
