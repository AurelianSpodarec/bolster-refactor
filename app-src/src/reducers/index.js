import { combineReducers } from 'redux';

import genericReducers from './generic';
import sitesReducers from './sites';

export default combineReducers({
    genericReducers,
    sitesReducers
});
