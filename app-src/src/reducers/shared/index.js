import { combineReducers } from 'redux';

import fieldErrorsReducer from './fieldErrors';
import loginReducer from './login';
import profileReducer from './profile';
import tabsReducer from './tabs';
import tablesReducer from './tables';
import decodeJWTReducer from './decodeJWT';
import modalReducer from './modal';
import filesUploadingReducer from './fileUpload';

export default combineReducers({
    decodeJWTReducer,
    fieldErrorsReducer,
    loginReducer,
    modalReducer,
    profileReducer,
    tabsReducer,
    tablesReducer,
    filesUploadingReducer
});
