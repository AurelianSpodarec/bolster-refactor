import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import creditLogsReducers from './creditLogs';
import profileReducers from './profile';
import companyReducers from './company';
import notificationsReducers from './notifications';
import messagesReducers from './messages';
import generationQueueReducers from './generationQueue';
import searchReducers from './search';
import authReducers from './auth';

export default combineReducers({
    genericReducers,
    sitesReducers,
    profileReducers,
    notificationsReducers,
    creditLogsReducers,
    companyReducers,
    messagesReducers,
    generationQueueReducers,
    searchReducers,
    authReducers
});
