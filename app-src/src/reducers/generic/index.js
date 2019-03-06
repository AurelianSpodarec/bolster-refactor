import { combineReducers } from 'redux';

import tabs from './tabs';
import fieldErrors from './fieldErrors';

export default combineReducers({
    tabs,
    fieldErrors
});
