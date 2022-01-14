export const selectMessageCentreIsFetching = state =>
    state.companyAdmin.messageCentreReducer.isFetching;
export const selectMessageCentreError = state => state.companyAdmin.messageCentreReducer.error;

export const selectSystemMessages = state => state.companyAdmin.messageCentreReducer.systemMessages;
export const selectCompanyAlerts = state => state.companyAdmin.messageCentreReducer.companyAlerts;
export const selectOpertiveAlerts = state =>
    state.companyAdmin.messageCentreReducer.operativeAlerts;
export const selectDrawingExpiryMessages = state =>
    state.companyAdmin.messageCentreReducer.drawingExpiry;

export const selectSelectedTab = state => state.companyAdmin.messageCentreReducer.selectedTab;
