import { combineReducers } from 'redux';

import companiesReducer from './companies';
import enquiriesReducer from './enquiries';
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
import demoRequestsReducer from './demoRequests';
import moveToolReducer from './moveTool';
import sosCodesReducer from './sosCodes';
import operativeAlertsReducer from 'reducers/superAdmin/operativeAlerts';
import mergeToolReducer from './mergeTool';
import manufacturersReducer from './manufacturers';
import manufacturersOptionValuesReducer from './manufacturersOptionValues';

export default combineReducers({
    adminServicesReducer,
    buildingsReducer,
    companiesReducer,
    companyReportsReducer,
    companySubscriptionReducer,
    demoRequestsReducer,
    drawingsReducer,
    enquiriesReducer,
    floorsReducer,
    invoicePaymentsReducer,
    invoicesReducer,
    manufacturersReducer,
    manufacturersOptionValuesReducer,
    mergeToolReducer,
    moveToolReducer,
    operativeAlertsReducer,
    sitesReducer,
    sosCodesReducer,
    templateLabelFieldsReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    usersReducer,
});
