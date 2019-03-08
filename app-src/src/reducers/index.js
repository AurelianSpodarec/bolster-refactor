import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import buildingsReducers from './buildings';
import creditLogsReducers from './creditLogs';
import profileReducers from './profile';
import companyReducers from './company';
import notificationsReducers from './notifications';
import messagesReducers from './messages/index';
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
    messagesReducers,
    generationQueueReducers,
    searchReducers,
    authReducers,
    sitesReducer
});
