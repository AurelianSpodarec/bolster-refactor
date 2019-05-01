import { combineReducers } from 'redux';

import companiesReducer from './companies';
import enquiriesReducer from './enquiries';
import companyReportsReducer from './companyReports';
import invoicesReducer from './invoices';
import adminServicesReducer from './adminServices';
import templateQuestionFormReducer from './templateQuestionForm';
import templateQuestionsReducer from './templateQuestions';
import templatesReducer from './templates';
import templateSectionsReducer from './templateSections';
import templateLabelFieldsReducer from './templateLabelFields';
import usersReducer from './users';
import companySubscriptionReducer from './companySubscription';

export default combineReducers({
    companiesReducer,
    enquiriesReducer,
    companyReportsReducer,
    invoicesReducer,
    adminServicesReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    templateLabelFieldsReducer,
    usersReducer,
    companySubscriptionReducer
});
