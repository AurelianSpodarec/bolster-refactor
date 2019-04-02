import { combineReducers } from 'redux';

import buildingsReducer from './buildings';
import companiesReducer from './companies';
import drawingsReducer from './drawings';
import creditLogsReducer from './creditLogs';
import floorsReducer from './floors';
import generationQueueReducer from './generationQueue';
import messagesReducer from './messages';
import notificationsReducer from './notifications';
import searchReducer from './search';
import sitesReducer from './sites';
import inspectionLogsReducer from './inspectionLogs';
import tablesReducer from './tables';
import documentsReducer from './documents';
import clientsReducer from './clients';
import pinsReducer from './pins';
import pinCustomFieldsReducer from './pinCustomFields';
import pinHistoriesReducer from './pinHistories';
import operativesReducer from './operatives';
import usersReducer from './users';
import enquiriesReducer from './enquiries';
import subscriptionsReducer from './subscriptions';

export default combineReducers({
    buildingsReducer,
    floorsReducer,
    drawingsReducer,
    notificationsReducer,
    creditLogsReducer,
    companiesReducer,
    messagesReducer,
    generationQueueReducer,
    searchReducer,
    sitesReducer,
    inspectionLogsReducer,
    tablesReducer,
    documentsReducer,
    clientsReducer,
    pinsReducer,
    pinCustomFieldsReducer,
    pinHistoriesReducer,
    operativesReducer,
    usersReducer,
    enquiriesReducer,
    subscriptionsReducer
});
