import { combineReducers } from 'redux';

import contactReducer from './contact';
import requestDemoReducer from './requestDemo';
import drawingsReducer from './drawings';
import pinsReducer from './pins';

export default combineReducers({
    contactReducer,
    requestDemoReducer,
    drawingsReducer,
    pinsReducer
});
