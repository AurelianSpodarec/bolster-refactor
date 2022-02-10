export const selectSuperAdminTimesheetsIsFetching = state =>
    state.superAdmin.timesheetsReducer.isFetching;
export const selectSuperAdminTimesheets = state => state.superAdmin.timesheetsReducer.timesheets;
export const selectSuperAdminTimesheetsError = state => state.superAdmin.timesheetsReducer.error;
