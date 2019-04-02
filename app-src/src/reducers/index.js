import { combineReducers } from 'redux';

import buildingsReducer from './companyAdmin/buildings';
import companiesReducer from './companyAdmin/companies';
import drawingsReducer from './companyAdmin/drawings';
import creditLogsReducer from './companyAdmin/creditLogs';
import floorsReducer from './companyAdmin/floors';
import fieldErrorsReducer from './shared/fieldErrors';
import generationQueueReducer from './companyAdmin/generationQueue';
import loginReducer from './shared/login';
import messagesReducer from './companyAdmin/messages';
import notificationsReducer from './companyAdmin/notifications';
import profileReducer from './shared/profile';
import searchReducer from './companyAdmin/search';
import sitesReducer from './companyAdmin/sites';
import tabsReducer from './shared/tabs';
import inspectionLogsReducer from './companyAdmin/inspectionLogs';
import tablesReducer from './companyAdmin/tables';
import documentsReducer from './companyAdmin/documents';
import clientsReducer from './companyAdmin/clients';
import pinsReducer from './companyAdmin/pins';
import decodeJWTReducer from './shared/decodeJWT';
import pinCustomFieldsReducer from './companyAdmin/pinCustomFields';
import pinHistoriesReducer from './companyAdmin/pinHistories';
import operativesReducer from './companyAdmin/operatives';
import modalReducer from './shared/modal';
import templateSectionsReducer from './superAdmin/templateSections';
import templateQuestionsReducer from './superAdmin/templateQuestions';
import templatesReducer from './superAdmin/templates';
import servicesReducer from './superAdmin/services';
import usersReducer from './companyAdmin/users';
import enquiriesReducer from './companyAdmin/enquiries';
import subscriptionsReducer from './companyAdmin/subscriptions';

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
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    servicesReducer,
    usersReducer,
    enquiriesReducer,
    subscriptionsReducer
});
