import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import profileReducers from './profile';
import companyReducers from './company';
import notificationsReducers from './notifications';
import messagesReducers from './messages';
import generationQueueReducers from './generationQueue';

export default combineReducers({
    genericReducers,
    sitesReducers,
    profileReducers,
    companyReducers,
    notificationsReducers,
    messagesReducers,
    generationQueueReducers
});
