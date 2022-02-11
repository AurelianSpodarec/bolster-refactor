export const selectSuperAdminTimesheetsIsFetching = state =>
    state.superAdmin.timesheetsReducer.isFetching;
export const selectSuperAdminTimesheets = state => state.superAdmin.timesheetsReducer.timesheets;
export const selectSuperAdminTimesheetsError = state => state.superAdmin.timesheetsReducer.error;

export const selectSuperAdminTimesheetsPage = state =>
    state.superAdmin.timesheetsReducer.pages.currentPage;
export const selectSuperAdminTimesheetsTotalPage = state =>
    state.superAdmin.timesheetsReducer.pages.totalPages;
export const selectSuperAdminTimesheetsTotalCount = state =>
    state.superAdmin.timesheetsReducer.pages.totalCount;
export const selectSuperAdminTimesheetsPageSize = state =>
    state.superAdmin.timesheetsReducer.pages.pageSize;
