import { combineReducers } from 'redux';

import shared from './shared';
import companyAdmin from './companyAdmin';
import superAdmin from './superAdmin';

export default combineReducers({
    shared,
    companyAdmin,
    superAdmin
});
