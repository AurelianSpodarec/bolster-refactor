import { combineReducers } from 'redux';

import shared from './shared';
import companyAdmin from './companyAdmin';
import superAdmin from './superAdmin';
import frontEnd from './frontEnd';
import client from './client';

export default combineReducers({
    shared,
    companyAdmin,
    superAdmin,
    client,
    frontEnd,
});
