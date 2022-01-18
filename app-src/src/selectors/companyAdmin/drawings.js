export const selectDrawingsIsFetching = state => state.companyAdmin.drawingsReducer.isFetching;
export const selectDrawingsFetchError = state => state.companyAdmin.drawingsReducer.error;
export const selectDrawings = state => state.companyAdmin.drawingsReducer.drawings;
