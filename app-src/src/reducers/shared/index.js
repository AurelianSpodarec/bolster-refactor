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
import passwordRegexReducer from './passwordRegex';
import timeReducer from './time';
import sitesFilterReducer from './sitesFilter';
import selectedHistoryReducer from './selectedHistory';
import mobileReducer from './mobile';
import forgotPasswordReducer from './forgotPassword';
import isIE10Reducer from './isIE10';
import sortReducer from './sort';
import legalDocumentsReducer from './legalDocuments';
import bannerNotificationReducer from './bannerNotifications';
import twoFactorReducer from './twoFactor';

export default combineReducers({
    confirmLeaveReducer,
    decodeJWTReducer,
    fieldErrorsReducer,
    loginReducer,
    modalReducer,
    mobileReducer,
    passwordRegexReducer,
    profileReducer,
    tabsReducer,
    timeReducer,
    registerReducer,
    tablesReducer,
    filesUploadingReducer,
    sitesFilterReducer,
    selectedHistoryReducer,
    forgotPasswordReducer,
    isIE10Reducer,
    legalDocumentsReducer,
    sortReducer,
    bannerNotificationReducer,
    twoFactorReducer,
});
