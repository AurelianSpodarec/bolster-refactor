import { combineReducers } from 'redux';

import activityLogReducer from './activityLog';
import companiesReducer from './companies';
import contactSubmissionsReducer from './contactSubmissions';
import companyReportsReducer from './companyReports';
import deletedDataReducer from './deletedData';
import invoicesReducer from './invoices';
import invoicePaymentsReducer from './invoicePayments';
import adminServicesReducer from './adminServices';
import templateQuestionFormReducer from './templateQuestionForm';
import templateQuestionsReducer from './templateQuestions';
import templatesReducer from './templates';
import templateSectionsReducer from './templateSections';
import templateLabelFieldsReducer from './templateLabelFields';
import usersReducer from './users';
import userCreationsReducer from './userCreations';
import companySubscriptionReducer from './companySubscription';
import sitesReducer from './sites';
import buildingsReducer from './buildings';
import floorsReducer from './floors';
import drawingsReducer from './drawings';
import pinsReducer from './pins';
import moveToolReducer from './moveTool';
import sosCodesReducer from './sosCodes';
import operativeAlertsReducer from 'reducers/superAdmin/operativeAlerts';
import mergeToolReducer from './mergeTool';
import userGuideReducer from './userGuide';
import frontendTextSettingsReducer from './frontendTextSettings';
import frontendTrustedBySettingsReducer from './frontendTrustedBySettings';
import expiryToolReducer from './expiryTool';
import newFeaturesReducer from './newFeatures';
import recentlyExtendedReducer from './recentlyExtended';
import legalDocumentsReducer from './legalDocuments';
import syncsReducer from './syncs';
import bannerNotificationsReducer from './bannerNotifications';
import demoAccessCodesReducer from './demoAccessCodes';
import companyTrackingReducer from './companyTracking';
import bugReportsReducer from './bugReports';
import timesheetsReducer from './timesheets';
import faqsReducer from './faqs';
import drawingsLogsReducer from './drawingUploadLogs';
import pinOptionTypesReducer from './pinOptionTypes';
import pinOptionSetsReducer from './pinOptionSets';
import pinOptionsReducer from './pinOptions';
import pinOptionVersionsReducer from './pinOptionVersions';
import pinOptionDocumentsReducer from './pinOptionDocuments';
import pinOptionDocumentsVersionsReducer from './pinOptionDocumentsVersions';
import pushNotificationsReducer from './pushNotifications';

export default combineReducers({
    activityLogReducer,
    adminServicesReducer,
    bannerNotificationsReducer,
    bugReportsReducer,
    buildingsReducer,
    companiesReducer,
    companyReportsReducer,
    companySubscriptionReducer,
    companyTrackingReducer,
    contactSubmissionsReducer,
    deletedDataReducer,
    demoAccessCodesReducer,
    drawingsLogsReducer,
    drawingsReducer,
    expiryToolReducer,
    faqsReducer,
    floorsReducer,
    frontendTextSettingsReducer,
    frontendTrustedBySettingsReducer,
    invoicePaymentsReducer,
    invoicesReducer,
    legalDocumentsReducer,
    mergeToolReducer,
    moveToolReducer,
    newFeaturesReducer,
    operativeAlertsReducer,
    pinOptionsReducer,
    pinOptionSetsReducer,
    pinOptionTypesReducer,
    pinOptionVersionsReducer,
    pinOptionDocumentsReducer,
    pinOptionDocumentsVersionsReducer,
    pinsReducer,
    pushNotificationsReducer,
    recentlyExtendedReducer,
    sitesReducer,
    sosCodesReducer,
    syncsReducer,
    templatesReducer,
    templateLabelFieldsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    templateSectionsReducer,
    timesheetsReducer,
    usersReducer,
    userCreationsReducer,
    userGuideReducer,
});
