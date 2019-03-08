import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import buildingsReducers from './buildings';
import creditLogsReducers from './creditLogs';
import profileReducer from './profile';
import companyReducers from './company';
import notificationsReducers from './notifications';
import messagesReducer from './messages';
import generationQueueReducers from './generationQueue';
import searchReducer from './search';
import authReducers from './auth';
import sitesReducer from './sites';

export default combineReducers({
    genericReducers,
    sitesReducers,
    buildingsReducers,
    profileReducer,
    notificationsReducers,
    creditLogsReducers,
    companyReducers,
    messagesReducer,
    generationQueueReducers,
    searchReducer,
    authReducers,
    sitesReducer
});
