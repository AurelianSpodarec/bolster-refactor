export const selectActivityLog = state => state.superAdmin.activityLogReducer.activityLog;
export const selectActivityLogArr = state =>
    Object.values(state.superAdmin.activityLogReducer.activityLog);
export const selectActivityLogIsFetching = state => state.superAdmin.activityLogReducer.isFetching;
export const selectActivityLogError = state => state.superAdmin.activityLogReducer.error;
