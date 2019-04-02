import { combineReducers } from 'redux';

import templateSectionsReducer from './templateSections';
import templateQuestionsReducer from './templateQuestions';
import templatesReducer from './templates';
import servicesReducer from './services';

export default combineReducers({
    templatesReducer,
    templateSectionsReducer,
    templateQuestionsReducer,
    servicesReducer
});
