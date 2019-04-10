import { combineReducers } from 'redux';

import buildingsReducer from './buildings';
import cardsReducer from './cards';
import clientsReducer from './clients';
import companiesReducer from './companies';
import companyUsersReducer from '../companyAdmin/companyUsers';
import creditLogsReducer from './creditLogs';
import documentsReducer from './documents';
import drawingsReducer from './drawings';
import floorsReducer from './floors';
import inspectionLogsReducer from './inspectionLogs';
import invoicesReducer from './invoices';
import messagesReducer from './messages';
import operativesReducer from './operatives';
import pinAnswersReducer from './pinAnswers';
import pinHistoriesReducer from './pinHistories';
import templatesReducer from './templates';
import templateSectionsReducer from './templateSections';
import templateVersionsReducer from './templateVersions';
import templateQuestionsReducer from './templateQuestions';
import pinsReducer from './pins';
import searchReducer from './search';
import servicesReducer from './services';
import sitesReducer from './sites';
import statsReducer from './stats';
import subscriptionsReducer from './subscriptions';
import invoiceItemsReducer from './invoiceItems';

export default combineReducers({
    buildingsReducer,
    cardsReducer,
    clientsReducer,
    companiesReducer,
    companyUsersReducer,
    creditLogsReducer,
    documentsReducer,
    drawingsReducer,
    floorsReducer,
    inspectionLogsReducer,
    invoicesReducer,
    invoiceItemsReducer,
    messagesReducer,
    operativesReducer,
    pinAnswersReducer,
    pinHistoriesReducer,
    templatesReducer,
    templateSectionsReducer,
    templateVersionsReducer,
    templateQuestionsReducer,
    pinsReducer,
    searchReducer,
    servicesReducer,
    sitesReducer,
    statsReducer,
    subscriptionsReducer
});
