export const selectWorkingHoursIsFetching = state =>
    state.companyAdmin.workingHoursReducer.isFetching;
export const selectWorkingHoursFetchError = state =>
    state.companyAdmin.workingHoursReducer.fetchError;

export const selectWorkingHours = state =>
    state.companyAdmin.workingHoursReducer.workingHours || [];

export const selectUserWorkingHours = (state, userID) =>
    state.companyAdmin.workingHoursReducer.workingHours[userID];
