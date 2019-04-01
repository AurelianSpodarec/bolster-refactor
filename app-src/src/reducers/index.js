import { combineReducers } from 'redux';

import buildingsReducer from './buildings';
import companiesReducer from './companies';
import drawingsReducer from './drawings';
import creditLogsReducer from './creditLogs';
import floorsReducer from './floors';
import fieldErrorsReducer from './fieldErrors';
import generationQueueReducer from './generationQueue';
import loginReducer from './login';
import messagesReducer from './messages';
import notificationsReducer from './notifications';
import profileReducer from './profile';
import searchReducer from './search';
import sitesReducer from './sites';
import tabsReducer from './tabs';
import inspectionLogsReducer from './inspectionLogs';
import tablesReducer from './tables';
import documentsReducer from './documents';
import clientsReducer from './clients';
import pinsReducer from './pins';
import decodeJWTReducer from './decodeJWT';
import pinCustomFieldsReducer from './pinCustomFields';
import pinHistoriesReducer from './pinHistories';
import operativesReducer from './operatives';
import modalReducer from './modal';
import templateSectionsReducer from './superAdmin/templateSections';
import templateQuestionsReducer from './superAdmin/templateQuestions';
import servicesReducer from './services';
import usersReducer from './users';
import enquiriesReducer from './enquiries';

export default combineReducers({
    buildingsReducer,
    floorsReducer,
    profileReducer,
    drawingsReducer,
    notificationsReducer,
    creditLogsReducer,
    companiesReducer,
    messagesReducer,
    generationQueueReducer,
    searchReducer,
    sitesReducer,
    fieldErrorsReducer,
    tabsReducer,
    loginReducer,
    inspectionLogsReducer,
    tablesReducer,
    documentsReducer,
    clientsReducer,
    pinsReducer,
    decodeJWTReducer,
    pinCustomFieldsReducer,
    pinHistoriesReducer,
    operativesReducer,
    modalReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    servicesReducer,
    usersReducer,
    enquiriesReducer
});
