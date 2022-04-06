import { combineReducers } from 'redux';

import activityLogReducer from './activityLog';
import addPinDropdownOptions from './addPinDropdownOptions';
import addPinFormReducer from './addPinForm';
import addPinCoordinatesReducer from './addPinCoordinates';
import appReducer from './app';
import buildingsReducer from './buildings';
import cardsReducer from './cards';
import clientsReducer from './clients';
import companyAddressesGeocodeReducer from './companyAddressesGeocode';
import companiesPermissionsReducer from './companiesPermissions';
import companySettingsReducer from './companySettings';
import companyUsersReducer from '../companyAdmin/companyUsers';
import creditsReducer from './credits';
import creditLogsReducer from './creditLogs';
import dashboardReducer from './dashboard';
import documentsReducer from './documents';
import drawingsReducer from './drawings';
import floorsReducer from './floors';
import companyReportsReducer from './companyReports';
import headquartersReducer from './headquarters';
import inactiveCompanyUsersReducer from './inactiveCompanyUsers';
import inspectionLogsReducer from './inspectionLogs';
import invoiceItemsReducer from './invoiceItems';
import invoicesReducer from './invoices';
import jobReferencesReducer from './jobReferences';
import latestPinFeedReducer from './latestPinFeed';
import messageCentreReducer from './messageCentre';
import operativeAlertsReducer from './operativeAlerts';
import operativesReducer from './operatives';
import pendingInvitesReducer from './pendingInvites';
import pinAnswersReducer from './pinAnswers';
import pinHistoriesReducer from './pinHistories';
import pinOptionTypesReducer from './pinOptionTypes';
import pinsReducer from './pins';
import searchReducer from './search';
import servicesReducer from './services';
import recentUpdatesReducer from './recentUpdates';
import reportsReducer from './reports';
import sitesReducer from './sites';
import statsReducer from './stats';
import subscriptionsReducer from './subscriptions';
import templatesReducer from './templates';
import templateSectionsReducer from './templateSections';
import templateVersionsReducer from './templateVersions';
import templateQuestionsReducer from './templateQuestions';
import transferRequestsReducer from './transferRequests';
import dropdownOptionsReducer from './dropdownOptions';
import approvedCompaniesReducer from './approvedCompanies';
import hierarchyReducer from './hierarchy';
import generatePinReportReducer from './generatePinReport';
import userDrawingsReducer from './userDrawings';
import deletedDataReducer from './deletedData';
import qrCodesReducer from './qrCodes';
import manufacturersReducer from './manufacturers';
import manufacturersOptionValuesReducer from './manufacturersOptionValues';
import optionValueDocumentsReducer from './optionValueDocuments';
import userGuideReducer from './userGuide';
import userDocumentsReducer from './userDocuments';
import zonesReducer from './zones';
import companySelectionReducer from './companySelection';
import alertsReducer from './alerts';
import timesheetsReducer from './timesheets';
import timesheetPinStatsReducer from './timesheetPinStats';
import userPinFeedsReducer from './userPinFeeds';
import bugReportsReducer from './bugReports';
import documentLibraryReducer from './documentLibrary';
import pinTasksReducer from './pinTasks';

export default combineReducers({
    activityLogReducer,
    addPinDropdownOptions,
    addPinCoordinatesReducer,
    addPinFormReducer,
    alertsReducer,
    appReducer,
    approvedCompaniesReducer,
    buildingsReducer,
    bugReportsReducer,
    cardsReducer,
    clientsReducer,
    companyAddressesGeocodeReducer,
    companiesPermissionsReducer,
    companySelectionReducer,
    companySettingsReducer,
    companyUsersReducer,
    creditsReducer,
    creditLogsReducer,
    dashboardReducer,
    deletedDataReducer,
    documentLibraryReducer,
    documentsReducer,
    drawingsReducer,
    dropdownOptionsReducer,
    floorsReducer,
    generatePinReportReducer,
    headquartersReducer,
    hierarchyReducer,
    inactiveCompanyUsersReducer,
    inspectionLogsReducer,
    invoicesReducer,
    invoiceItemsReducer,
    jobReferencesReducer,
    latestPinFeedReducer,
    companyReportsReducer,
    messageCentreReducer,
    manufacturersReducer,
    manufacturersOptionValuesReducer,
    operativeAlertsReducer,
    operativesReducer,
    optionValueDocumentsReducer,
    pendingInvitesReducer,
    pinAnswersReducer,
    pinHistoriesReducer,
    pinOptionTypesReducer,
    pinsReducer,
    pinTasksReducer,
    qrCodesReducer,
    recentUpdatesReducer,
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
    transferRequestsReducer,
    userDrawingsReducer,
    userDocumentsReducer,
    userGuideReducer,
    zonesReducer,
    timesheetsReducer,
    timesheetPinStatsReducer,
    userPinFeedsReducer,
});
