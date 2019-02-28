import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import profileReducers from './profile';
import notificationsReducers from './notifications';

export default combineReducers({
    genericReducers,
    sitesReducers,
    profileReducers,
    notificationsReducers
});
