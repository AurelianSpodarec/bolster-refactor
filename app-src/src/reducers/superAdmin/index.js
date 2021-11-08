import { combineReducers } from 'redux';

import companiesReducer from './companies';
import contactSubmissionsReducer from './contactSubmissions';
import companyReportsReducer from './companyReports';
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
import manufacturersReducer from './manufacturers';
import manufacturersOptionValuesReducer from './manufacturersOptionValues';
import optionValueDocumentsReducer from './optionValueDocuments';
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

export default combineReducers({
    adminServicesReducer,
    buildingsReducer,
    bugReportsReducer,
    companiesReducer,
    companyReportsReducer,
    companySubscriptionReducer,
    companyTrackingReducer,
    drawingsReducer,
    pinsReducer,
    contactSubmissionsReducer,
    floorsReducer,
    invoicePaymentsReducer,
    invoicesReducer,
    legalDocumentsReducer,
    manufacturersReducer,
    manufacturersOptionValuesReducer,
    mergeToolReducer,
    moveToolReducer,
    operativeAlertsReducer,
    optionValueDocumentsReducer,
    recentlyExtendedReducer,
    sitesReducer,
    sosCodesReducer,
    templateLabelFieldsReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    usersReducer,
    userCreationsReducer,
    userGuideReducer,
    frontendTextSettingsReducer,
    frontendTrustedBySettingsReducer,
    expiryToolReducer,
    newFeaturesReducer,
    syncsReducer,
    bannerNotificationsReducer,
    demoAccessCodesReducer,
});
