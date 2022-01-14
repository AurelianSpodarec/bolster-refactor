export const selectMessageCentreIsFetching = state =>
    state.companyAdmin.messageCentreReducer.isFetching;
export const selectMessageCentreError = state => state.companyAdmin.messageCentreReducer.error;

export const selectCompanyAlerts = state => state.companyAdmin.messageCentreReducer.companyAlerts;
