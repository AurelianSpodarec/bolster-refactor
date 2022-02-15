export const selectActivityLog = state => state.superAdmin.activityLogReducer.activityLog;
export const selectActivityLogArr = state =>
    Object.values(state.superAdmin.activityLogReducer.activityLog);
export const selectActivityLogIsFetching = state => state.superAdmin.activityLogReducer.isFetching;
export const selectActivityLogError = state => state.superAdmin.activityLogReducer.error;

export const selectActivityLogPageNumber = state => state.superAdmin.activityLogReducer.pageNumber;
export const selectActivityLogPageSize = state => state.superAdmin.activityLogReducer.pageSize;
export const selectActivityLogTotalCount = state => state.superAdmin.activityLogReducer.totalCount;
export const selectActivityLogTotalPages = state => state.superAdmin.activityLogReducer.totalPages;
