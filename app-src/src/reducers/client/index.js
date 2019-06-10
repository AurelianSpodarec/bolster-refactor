import { combineReducers } from 'redux';

import buildingsReducer from './clientBuildings';
import companiesReducer from './clientCompanies';
import companyUsers from './clientCompanyUsers';
import drawingsReducer from './clientDrawings';
import floorsReducer from './clientFloors';
import latestPinFeedReducer from './clientLatestPinFeed';
import pinHistoriesReducer from './clientPinHistories';
import pinsReducer from './clientPins';
import statsReducer from './clientStats';
import servicesReducer from './clientServices';
import sitesReducer from './clientSites';
import templatesReducer from './clientTemplates';

export default combineReducers({
    buildingsReducer,
    companiesReducer,
    companyUsers,
    drawingsReducer,
    floorsReducer,
    latestPinFeedReducer,
    pinHistoriesReducer,
    pinsReducer,
    statsReducer,
    servicesReducer,
    sitesReducer,
    templatesReducer
});
