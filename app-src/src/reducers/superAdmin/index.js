import { combineReducers } from 'redux';

import companiesReducer from './companies';
import enquiriesReducer from './enquiries';
import generationQueueReducer from './generationQueue';
import invoicesReducer from './invoices';
import servicesReducer from './services';
import templateQuestionFormReducer from './templateQuestionForm';
import templateQuestionsReducer from './templateQuestions';
import templatesReducer from './templates';
import templateSectionsReducer from './templateSections';
import usersReducer from './users';
import companySubscriptionReducer from './companySubscription';

export default combineReducers({
    companiesReducer,
    enquiriesReducer,
    generationQueueReducer,
    invoicesReducer,
    servicesReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    usersReducer,
    companySubscriptionReducer
});
