import { combineReducers } from 'redux';

import sitesReducers from './sites';
import buildingsReducers from './buildings';
import creditLogsReducers from './creditLogs';
import profileReducer from './profile';
import companyReducers from './company';
import notificationsReducer from './notifications';
import messagesReducer from './messages';
import generationQueueReducers from './generationQueue';
import searchReducer from './search';
import authReducers from './auth';
import sitesReducer from './sites';
import fieldErrorsReducer from './fieldErrors';
import tabsReducer from './tabs';

export default combineReducers({
    sitesReducers,
    buildingsReducers,
    profileReducer,
    notificationsReducer,
    creditLogsReducers,
    companyReducers,
    messagesReducer,
    generationQueueReducers,
    searchReducer,
    authReducers,
    sitesReducer,
    fieldErrorsReducer,
    tabsReducer
});
