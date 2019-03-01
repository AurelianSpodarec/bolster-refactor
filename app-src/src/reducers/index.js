import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './creditLogs';
import profileReducers from './profile';
import notificationsReducers from './notifications';
import creditLogsReducers from './creditLogs';

export default combineReducers({
    genericReducers,
    sitesReducers,
    profileReducers,
    notificationsReducers,
    creditLogsReducers
});
