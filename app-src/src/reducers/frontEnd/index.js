import { combineReducers } from 'redux';

import authReducer from './auth';
import contactReducer from './contact';
import drawingsReducer from './drawings';
import pinsReducer from './pins';
import layoutReducer from './layout';

export default combineReducers({
    contactReducer,
    drawingsReducer,
    pinsReducer,
    layoutReducer,
    authReducer,
});
