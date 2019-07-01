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

export default combineReducers({
    companiesReducer,
    enquiriesReducer,
    companyReportsReducer,
    invoicesReducer,
    invoicePaymentsReducer,
    adminServicesReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    templateLabelFieldsReducer,
    usersReducer,
    companySubscriptionReducer,
    sitesReducer,
    buildingsReducer,
    floorsReducer,
    drawingsReducer,
    demoRequestsReducer
});
