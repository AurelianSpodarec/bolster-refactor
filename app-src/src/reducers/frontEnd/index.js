import { combineReducers } from 'redux';

import contactReducer from './contact';
import drawingsReducer from './drawings';
import pinsReducer from './pins';
import layoutReducer from './layout';

export default combineReducers({
    contactReducer,
    drawingsReducer,
    pinsReducer,
    layoutReducer,
});
