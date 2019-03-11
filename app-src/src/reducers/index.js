import { combineReducers } from 'redux';

import authReducer from './auth';
import buildingsReducer from './buildings';
import companiesReducer from './companies';
import drawingsReducer from './drawings';
import creditLogsReducer from './creditLogs';
import floorsReducer from './floors';
import fieldErrorsReducer from './fieldErrors';
import generationQueueReducer from './generationQueue';
import loginReducer from './login';
import messagesReducer from './messages';
import notificationsReducer from './notifications';
import profileReducer from './profile';
import searchReducer from './search';
import sitesReducer from './sites';
import tabsReducer from './tabs';
import inspectionLogsReducer from './inspectionLogs';
import breadcrumbsReducer from './breadcrumbs';
import tablesReducer from './tables';
import documentsReducer from './documents';
import clientsReducer from './clients';

export default combineReducers({
    buildingsReducer,
    floorsReducer,
    profileReducer,
    drawingsReducer,
    notificationsReducer,
    creditLogsReducer,
    companiesReducer,
    messagesReducer,
    generationQueueReducer,
    searchReducer,
    sitesReducer,
    fieldErrorsReducer,
    tabsReducer,
    authReducer,
    loginReducer,
    inspectionLogsReducer,
    breadcrumbsReducer,
    tablesReducer,
    documentsReducer,
    clientsReducer
});
