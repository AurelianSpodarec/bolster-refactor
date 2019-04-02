import { combineReducers } from 'redux';

import fieldErrorsReducer from './shared/fieldErrors';
import loginReducer from './shared/login';
import profileReducer from './shared/profile';
import tabsReducer from './shared/tabs';
import decodeJWTReducer from './shared/decodeJWT';
import modalReducer from './shared/modal';

export default combineReducers({
    profileReducer,
    fieldErrorsReducer,
    tabsReducer,
    loginReducer,
    decodeJWTReducer,
    modalReducer
});
