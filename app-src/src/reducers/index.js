import { combineReducers } from 'redux';

import shared from './shared';
import companyAdmin from './companyAdmin';
import superAdmin from './superAdmin';
// ! plug in client reducer when ready
import client from './client';

export default combineReducers({
    shared,
    companyAdmin,
    superAdmin,
    client
});
