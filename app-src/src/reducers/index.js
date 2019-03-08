import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import buildingsReducers from './buildings';
import creditLogsReducers from './creditLogs';
import profileReducers from './profile';
import companyReducers from './company';
import notificationsReducers from './notifications';
import messagesReducer from './messages';
import generationQueueReducers from './generationQueue';
import searchReducers from './search';
import authReducers from './auth';
import sitesReducer from './sites';

export default combineReducers({
    genericReducers,
    sitesReducers,
    buildingsReducers,
    profileReducers,
    notificationsReducers,
    creditLogsReducers,
    companyReducers,
    messagesReducer,
    generationQueueReducers,
    searchReducers,
    authReducers,
    sitesReducer
});
