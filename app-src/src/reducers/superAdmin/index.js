import { combineReducers } from 'redux';

import enquiriesReducer from './enquiries';
import generationQueueReducer from './generationQueue';
import servicesReducer from './services';
import templateSectionsReducer from './templateSections';
import templateQuestionsReducer from './templateQuestions';
import templateQuestionFormReducer from './templateQuestionForm';
import templatesReducer from './templates';
import usersReducer from './users';

export default combineReducers({
    enquiriesReducer,
    generationQueueReducer,
    servicesReducer,
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    templateQuestionFormReducer,
    usersReducer
});
