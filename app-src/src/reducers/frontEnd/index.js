import { combineReducers } from 'redux';

import contactReducer from './contact';
import requestDemoReducer from './requestDemo';

export default combineReducers({
    contactReducer,
    requestDemoReducer
});
