import { combineReducers } from 'redux';

import { updateObj, removeObjItem } from 'helpers/generic';
import {
    ADD_SECTION,
    DELETE_SECTION,
    UPDATE_SECTION,
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    sections: sectionsReducer,
    questions: questionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_SECTION:
        case UPDATE_SECTION:
            return updateObj(state, action.section.uuid, action.section);
        case DELETE_SECTION:
            return removeObjItem(state, action.uuid);
        default:
            return state;
    }
}

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION:
        case EDIT_QUESTION:
            return updateObj(state, action.question.uuid, action.question);
        case DELETE_QUESTION:
            return removeObjItem(state, action.uuid);
        default:
            return state;
    }
}
