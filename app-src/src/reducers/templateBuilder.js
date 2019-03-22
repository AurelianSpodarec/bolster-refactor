import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import {
    ADD_SECTION,
    ADD_QUESTION
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    sections: sectionsReducer,
    questions: questionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_SECTION:
            return updateObj(state, action.section.uuid, action.section);
        default:
            return state;
    }
}

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return updateObj(state, action.question.uuid, action.question);
        default:
            return state;
    }
}
