export const selectMessageCentreIsFetching = state =>
    state.companyAdmin.messageCentreReducer.isFetching;
export const selectMessageCentreIsFetchingSystemMessages = state =>
    state.companyAdmin.messageCentreReducer.isFetchingSystemMessages;
export const selectMessageCentreIsFetchingCompanyAlerts = state =>
    state.companyAdmin.messageCentreReducer.isFetchingCompanyAlerts;
export const selectMessageCentreIsFetchingOperativeAlerts = state =>
    state.companyAdmin.messageCentreReducer.isFetchingOperativeAlerts;
export const selectMessageCentreIsFetchingDrawingExpiryMessages = state =>
    state.companyAdmin.messageCentreReducer.isFetchingDrawingExpiryMessages;
export const selectMessageCentreError = state => state.companyAdmin.messageCentreReducer.error;

export const selectMessageCentreIsPosting = state =>
    state.companyAdmin.messageCentreReducer.isPosting;
export const selectMessageCentrePostSuccess = state =>
    state.companyAdmin.messageCentreReducer.postSuccess;
export const selectMessageCentrePostError = state =>
    state.companyAdmin.messageCentreReducer.postError;

export const selectSystemMessages = state => state.companyAdmin.messageCentreReducer.systemMessages;
export const selectCompanyAlerts = state => state.companyAdmin.messageCentreReducer.companyAlerts;
export const selectOperativeAlerts = state =>
    state.companyAdmin.messageCentreReducer.operativeAlerts;
export const selectDrawingExpiryMessages = state =>
    state.companyAdmin.messageCentreReducer.drawingExpiry;

export const selectSelectedTab = state => state.companyAdmin.messageCentreReducer.selectedTab;

// message counts
export const selectSystemMessagesCount = state => {
    const messages = selectSystemMessages(state);
    const messagesArr = Object.values(messages);
    const unreadMessages = messagesArr.filter(message => !message.isRead);

    return unreadMessages.length;
};

export const selectCompanyAlertsCount = state => {
    const messages = selectCompanyAlerts(state);
    const messagesArr = Object.values(messages);
    const unreadMessages = messagesArr.filter(message => !message.isRead);

    return unreadMessages.length;
};

export const selectDrawingExpiryMessagesCount = state => {
    const messages = selectDrawingExpiryMessages(state);
    const messagesArr = Object.values(messages);
    const unreadMessages = messagesArr.filter(message => !message.isRead);

    return unreadMessages.length;
};

export const selectTotalMessagesCount = state => {
    const systemMessagesCount = selectSystemMessagesCount(state);
    const companyAlertsCount = selectCompanyAlertsCount(state);
    const drawingExpiryMessagesCount = selectDrawingExpiryMessagesCount(state);

    return systemMessagesCount + companyAlertsCount + drawingExpiryMessagesCount;
};
