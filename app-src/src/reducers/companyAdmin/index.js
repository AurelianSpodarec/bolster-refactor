import { combineReducers } from 'redux';

import buildingsReducer from './buildings';
import companiesReducer from './companies';
import drawingsReducer from './drawings';
import creditLogsReducer from './creditLogs';
import floorsReducer from './floors';
import messagesReducer from './messages';
import searchReducer from './search';
import sitesReducer from './sites';
import inspectionLogsReducer from './inspectionLogs';
import documentsReducer from './documents';
import clientsReducer from './clients';
import pinsReducer from './pins';
import pinCustomFieldsReducer from './pinCustomFields';
import pinHistoriesReducer from './pinHistories';
import operativesReducer from './operatives';
import subscriptionsReducer from './subscriptions';
import companyUsersReducer from '../companyAdmin/companyUsers';
import servicesReducer from './services';
import statsReducer from './stats';

export default combineReducers({
    buildingsReducer,
    companyUsersReducer,
    floorsReducer,
    drawingsReducer,
    creditLogsReducer,
    companiesReducer,
    messagesReducer,
    searchReducer,
    sitesReducer,
    inspectionLogsReducer,
    documentsReducer,
    clientsReducer,
    pinsReducer,
    pinCustomFieldsReducer,
    pinHistoriesReducer,
    operativesReducer,
    subscriptionsReducer,
    servicesReducer,
    statsReducer
});
