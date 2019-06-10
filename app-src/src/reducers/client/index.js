import { combineReducers } from 'redux';

import buildingsReducer from './clientBuildings';
import companiesReducer from './clientCompanies';
import drawingOperativesReducer from './clientDrawingOperatives';
import drawingsReducer from './clientDrawings';
import floorsReducer from './clientFloors';
import latestPinFeedReducer from './clientLatestPinFeed';
import pinHistoriesReducer from './clientPinHistories';
import pinAnswersReducer from './clientPinAnswers';
import pinsReducer from './clientPins';
import statsReducer from './clientStats';
import servicesReducer from './clientServices';
import sitesReducer from './clientSites';
import templatesReducer from './clientTemplates';
import documentsReducer from './documents';

export default combineReducers({
    buildingsReducer,
    companiesReducer,
    documentsReducer,
    drawingOperativesReducer,
    drawingsReducer,
    floorsReducer,
    latestPinFeedReducer,
    pinHistoriesReducer,
    pinAnswersReducer,
    pinsReducer,
    statsReducer,
    servicesReducer,
    sitesReducer,
    templatesReducer
});
