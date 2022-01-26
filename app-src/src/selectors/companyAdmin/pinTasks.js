export const selectPinTasksIsFetching = state => state.companyAdmin.pinTasksReducer.isFetching;
export const selectPinTasksIsPosting = state => state.companyAdmin.pinTasksReducer.isPosting;

export const selectPinTasksPostSuccess = state => state.companyAdmin.pinTasksReducer.postSuccess;

export const selectPinTasksError = state => state.companyAdmin.pinTasksReducer.error;

export const selectPinTasks = state => state.companyAdmin.pinTasksReducer.pinTasks;
export const selectPinTask = (state, id) => state.companyAdmin.pinTasksReducer.pinTasks[id];
export const selectPinTaskSeriesMultiple = state =>
    state.companyAdmin.pinTasksReducer.pinTaskSeries;
export const selectPinTaskSeries = (state, id) =>
    state.companyAdmin.pinTasksReducer.pinTaskSeries[id];

export const selectPinRecurrenceFilters = state =>
    state.companyAdmin.pinTasksReducer.pinRecurrenceFilters;
