export const selectDrawingUploadLogsIsFetching = state =>
    state.superAdmin.drawingsLogsReducer.isFetching;
export const selectDrawingUploadLogsError = state => state.superAdmin.drawingsLogsReducer.error;
export const selectDrawingUploadLogs = state => state.superAdmin.drawingsLogsReducer.drawingsLogs;
