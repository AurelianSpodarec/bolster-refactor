import { combineReducers } from 'redux';

import buildingsReducer from './clientBuildings';
import companiesReducer from './clientCompanies';
import pinOperativesReducer from './clientPinOperatives';
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
import templateVersionsReducer from './clientTemplateVersions';
import templateSectionsReducer from './clientTemplateSections';
import templateQuestionsReducer from './clientTemplateQuestions';
import documentsReducer from './documents';
import clientCompaniesPermissionsReducer from './clientCompaniesPermissions';
import searchReducer from './clientSearch';
import companyReportsReducer from './clientCompanyReports';
import reportsReducer from './clientReports';
import messagesReducer from './clientMessages';
import generatePinReportReducer from './clientGeneratePinReport';

export default combineReducers({
    buildingsReducer,
    clientCompaniesPermissionsReducer,
    companyReportsReducer,
    companiesReducer,
    documentsReducer,
    pinOperativesReducer,
    drawingsReducer,
    floorsReducer,
    generatePinReportReducer,
    latestPinFeedReducer,
    messagesReducer,
    pinHistoriesReducer,
    pinAnswersReducer,
    pinsReducer,
    reportsReducer,
    statsReducer,
    searchReducer,
    servicesReducer,
    sitesReducer,
    templatesReducer,
    templateVersionsReducer,
    templateSectionsReducer,
    templateQuestionsReducer
});
