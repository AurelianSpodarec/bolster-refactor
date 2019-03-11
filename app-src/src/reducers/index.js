import { combineReducers } from 'redux';

import authReducer from './auth';
import buildingsReducer from './buildings';
import companyReducer from './company';
import creditLogsReducer from './creditLogs';
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

export default combineReducers({
    buildingsReducer,
    profileReducer,
    notificationsReducer,
    creditLogsReducer,
    companyReducer,
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
    documentsReducer
});
