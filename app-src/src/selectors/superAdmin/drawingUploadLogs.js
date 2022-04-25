export const selectDrawingUploadLogsIsFetching = state =>
    state.superAdmin.drawingsLogsReducer.isFetching;
export const selectDrawingUploadLogsError = state => state.superAdmin.drawingsLogsReducer.error;
export const selectDrawingUploadLogs = state => state.superAdmin.drawingsLogsReducer.drawingsLogs;

export const selectDrawingUploadLogPage = state => state.superAdmin.drawingsLogsReducer.pages.page;
export const selectDrawingUploadLogCount = state =>
    state.superAdmin.drawingsLogsReducer.pages.totalCount;
export const selectDrawingUploadLogPageSize = state =>
    state.superAdmin.drawingsLogsReducer.pages.pageSize;
