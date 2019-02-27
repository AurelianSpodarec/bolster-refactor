import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';
import profileReducers from './profile';

export default combineReducers({
    genericReducers,
    sitesReducers,
    profileReducers
});
