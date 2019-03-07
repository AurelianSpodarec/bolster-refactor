import { combineReducers } from 'redux';

import sites from './sites';
import sitesFilters from './sitesFilters';
import singleSiteClients from './singleSiteClients';

export default combineReducers({
    sites,
    singleSiteClients,
    sitesFilters
});
