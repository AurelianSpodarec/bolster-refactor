export const selectTimesheetPinStatsIsFetching = state =>
    state.companyAdmin.timesheetPinStatsReducer.isFetching;
export const selectTimesheetPinStatsFetchError = state =>
    state.companyAdmin.timesheetPinStatsReducer.error;
export const selectTimesheetPinStats = state => state.companyAdmin.timesheetPinStatsReducer.stats;
