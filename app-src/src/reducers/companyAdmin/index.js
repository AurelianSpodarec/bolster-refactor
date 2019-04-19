import { combineReducers } from 'redux';

import addPinFormReducer from './addPinForm';
import addPinCoordinatesReducer from './addPinCoordinates';
import buildingsReducer from './buildings';
import cardsReducer from './cards';
import clientsReducer from './clients';
import companiesPermissionsReducer from './companiesPermissions';
import companySettingsReducer from './companySettings';
import companyUsersReducer from '../companyAdmin/companyUsers';
import creditsReducer from './credits';
import creditLogsReducer from './creditLogs';
import documentsReducer from './documents';
import drawingsReducer from './drawings';
import floorsReducer from './floors';
import headquartersReducer from './headquarters';
import inspectionLogsReducer from './inspectionLogs';
import invoiceItemsReducer from './invoiceItems';
import invoicesReducer from './invoices';
import messagesReducer from './messages';
import operativesReducer from './operatives';
import pendingInvitesReducer from './pendingInvites';
import pinAnswersReducer from './pinAnswers';
import pinHistoriesReducer from './pinHistories';
import pinsReducer from './pins';
import searchReducer from './search';
import servicesReducer from './services';
import reportsReducer from './reports';
import sitesReducer from './sites';
import statsReducer from './stats';
import subscriptionsReducer from './subscriptions';
import templatesReducer from './templates';
import templateSectionsReducer from './templateSections';
import templateVersionsReducer from './templateVersions';
import templateQuestionsReducer from './templateQuestions';
import transferRequestsReducer from './transferRequests';
import operativeAlertsReducer from './operativeAlerts';

export default combineReducers({
    addPinCoordinatesReducer,
    addPinFormReducer,
    buildingsReducer,
    cardsReducer,
    clientsReducer,
    companiesPermissionsReducer,
    companySettingsReducer,
    companyUsersReducer,
    creditsReducer,
    creditLogsReducer,
    documentsReducer,
    drawingsReducer,
    floorsReducer,
    headquartersReducer,
    inspectionLogsReducer,
    invoicesReducer,
    invoiceItemsReducer,
    messagesReducer,
    operativeAlertsReducer,
    operativesReducer,
    pendingInvitesReducer,
    pinAnswersReducer,
    pinHistoriesReducer,
    pinsReducer,
    reportsReducer,
    searchReducer,
    servicesReducer,
    sitesReducer,
    statsReducer,
    subscriptionsReducer,
    templateQuestionsReducer,
    templatesReducer,
    templateSectionsReducer,
    templateVersionsReducer,
    transferRequestsReducer
});
