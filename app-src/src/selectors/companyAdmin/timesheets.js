export const selectTimesheetsIsFetching = state => state.companyAdmin.timesheetsReducer.isFetching;
export const selectTimesheetsFetchError = state => state.companyAdmin.timesheetsReducer.error;
export const selectTimesheetsIsPosting = state => state.companyAdmin.timesheetsReducer.isPosting;
export const selectTimesheetsPostError = state => state.companyAdmin.timesheetsReducer.postError;
export const selectTimesheets = state => state.companyAdmin.timesheetsReducer.timesheets;
export const selectTimesheetOptions = state =>
    state.companyAdmin.timesheetsReducer.timesheetOptions;
export const reportPostSuccess = state => state.companyAdmin.reportsReducer.postSuccess;
export const timesheetSelectedCompanyIDs = state =>
    state.companyAdmin.timesheetsReducer.selectedCompanyUserIDs;
export const selectFilterByHasClockedIn = state =>
    state.companyAdmin.timesheetsReducer.filterByHasClockedIn;
