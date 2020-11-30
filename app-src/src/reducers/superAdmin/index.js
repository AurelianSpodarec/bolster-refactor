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
import companySubscriptionReducer from './companySubscription';
import sitesReducer from './sites';
import buildingsReducer from './buildings';
import floorsReducer from './floors';
import drawingsReducer from './drawings';
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
import legalDocumentsReducer from './legalDocuments';

export default combineReducers({
    adminServicesReducer,
    buildingsReducer,
    companiesReducer,
    companyReportsReducer,
    companySubscriptionReducer,
    drawingsReducer,
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
    sitesReducer,
    sosCodesReducer,
    templateLabelFieldsReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    usersReducer,
    userGuideReducer,
    frontendTextSettingsReducer,
    frontendTrustedBySettingsReducer,
    expiryToolReducer,
    newFeaturesReducer,
});
