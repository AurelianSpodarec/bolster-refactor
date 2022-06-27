export const selectTimesheetsIsFetching = state => state.companyAdmin.timesheetsReducer.isFetching;
export const selectTimesheetsFetchError = state => state.companyAdmin.timesheetsReducer.error;
export const selectTimesheetsIsPosting = state => state.companyAdmin.timesheetsReducer.isPosting;
export const selectTimesheetsPostError = state => state.companyAdmin.timesheetsReducer.postError;
export const selectTimesheetsPostSuccess = state =>
    state.companyAdmin.timesheetsReducer.postSuccess;
export const selectTimesheetsIsDeleting = state => state.companyAdmin.timesheetsReducer.isDeleting;
export const selectTimesheetsDeleteError = state =>
    state.companyAdmin.timesheetsReducer.deleteError;
export const selectTimesheetsDeleteSuccess = state =>
    state.companyAdmin.timesheetsReducer.deleteSuccess;
export const selectTimesheets = state => state.companyAdmin.timesheetsReducer.timesheets;
export const selectTimesheetOptions = state =>
    state.companyAdmin.timesheetsReducer.timesheetOptions;
export const reportPostSuccess = state => state.companyAdmin.reportsReducer.postSuccess;
export const timesheetSelectedCompanyIDs = state =>
    state.companyAdmin.timesheetsReducer.selectedCompanyUserIDs;
export const timesheetSelectedJobReferenceIDs = state =>
    state.companyAdmin.timesheetsReducer.selectedJobReferenceIDs;
export const selectFilterByHasClockedIn = state =>
    state.companyAdmin.timesheetsReducer.filterByHasClockedIn;
export const selectTimesheetsReportDates = state =>
    state.companyAdmin.timesheetsReducer.reportDates;
