import { combineReducers } from 'redux';

import buildingsReducers from './buildings';
import creditLogsReducer from './creditLogs';
import profileReducer from './profile';
import companyReducer from './company';
import notificationsReducer from './notifications';
import messagesReducer from './messages';
import generationQueueReducer from './generationQueue';
import searchReducer from './search';
import authReducers from './auth';
import sitesReducer from './sites';
import fieldErrorsReducer from './fieldErrors';
import tabsReducer from './tabs';

export default combineReducers({
    buildingsReducers,
    profileReducer,
    notificationsReducer,
    creditLogsReducer,
    companyReducer,
    messagesReducer,
    generationQueueReducer,
    searchReducer,
    authReducers,
    sitesReducer,
    fieldErrorsReducer,
    tabsReducer
});
