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
import pinCustomFieldsReducer from './pinCustomFields';
import pinHistoriesReducer from './pinHistories';
import templatesReducer from './templates';
import pinsReducer from './pins';
import searchReducer from './search';
import servicesReducer from './services';
import sitesReducer from './sites';
import statsReducer from './stats';
import subscriptionsReducer from './subscriptions';

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
    messagesReducer,
    operativesReducer,
    pinAnswersReducer,
    pinCustomFieldsReducer,
    pinHistoriesReducer,
    templatesReducer,
    pinsReducer,
    searchReducer,
    servicesReducer,
    sitesReducer,
    statsReducer,
    subscriptionsReducer
});
