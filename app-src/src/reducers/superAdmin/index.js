import { combineReducers } from 'redux';

import enquiriesReducer from './enquiries';
import generationQueueReducer from './generationQueue';
import servicesReducer from './services';
import templateSectionsReducer from './templateSections';
import templateQuestionsReducer from './templateQuestions';
import templatesReducer from './templates';
import usersReducer from './users';
import companyUsersReducer from './companyUsers';

export default combineReducers({
    companyUsersReducer,
    enquiriesReducer,
    generationQueueReducer,
    servicesReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    usersReducer
});
