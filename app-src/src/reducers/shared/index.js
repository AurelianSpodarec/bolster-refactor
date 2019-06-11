import { combineReducers } from 'redux';

import confirmLeaveReducer from './confirmLeave';
import fieldErrorsReducer from './fieldErrors';
import loginReducer from './login';
import registerReducer from './register';
import profileReducer from './profile';
import tabsReducer from './tabs';
import tablesReducer from './tables';
import decodeJWTReducer from './decodeJWT';
import modalReducer from './modal';
import filesUploadingReducer from './fileUpload';
import timeReducer from './time';
import sitesFilterReducer from './sitesFilter';
import selectedHistoryReducer from './selectedHistory';

export default combineReducers({
    confirmLeaveReducer,
    decodeJWTReducer,
    fieldErrorsReducer,
    loginReducer,
    modalReducer,
    profileReducer,
    tabsReducer,
    timeReducer,
    registerReducer,
    tablesReducer,
    filesUploadingReducer,
    sitesFilterReducer,
    selectedHistoryReducer
});
