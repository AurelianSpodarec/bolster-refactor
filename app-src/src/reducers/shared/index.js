import { combineReducers } from 'redux';

import fieldErrorsReducer from './fieldErrors';
import loginReducer from './login';
import profileReducer from './profile';
import tabsReducer from './tabs';
import decodeJWTReducer from './decodeJWT';
import modalReducer from './modal';

export default combineReducers({
    profileReducer,
    fieldErrorsReducer,
    tabsReducer,
    loginReducer,
    decodeJWTReducer,
    modalReducer
});
