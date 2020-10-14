import { combineReducers } from 'redux';

import authReducer from './auth';
import bannersReducer from './banners';
import contactReducer from './contact';
import drawingsReducer from './drawings';
import pinsReducer from './pins';
import layoutReducer from './layout';

export default combineReducers({
    bannersReducer,
    contactReducer,
    drawingsReducer,
    pinsReducer,
    layoutReducer,
    authReducer,
});
