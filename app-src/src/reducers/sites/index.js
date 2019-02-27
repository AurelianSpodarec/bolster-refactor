import { combineReducers } from 'redux';

import sites from './sites';
import sitesFilters from './sitesFilters';

export default combineReducers({
    sites,
    sitesFilters
});
