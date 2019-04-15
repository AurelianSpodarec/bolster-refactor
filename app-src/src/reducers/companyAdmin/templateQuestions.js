import { combineReducers } from 'redux';

import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';
import { FETCH_DRAWING_TEMPLATES_SUCCESS } from 'constants/actionTypes/drawings';
import {
    FETCH_ALL_TEMPLATES_SUCCESS,
    SELECT_QUESTION,
    EDIT_TEMPLATE_QUESTION_SUCCESS
} from 'constants/actionTypes/templates';
import { convertArrToObj, updateObj } from 'helpers/generic';
import { formatQuestions } from 'helpers/templates';

export default combineReducers({
    questions: questionsReducer,
    selectedQuestionID: selectedQuestionIDReducer
});

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
        case FETCH_DRAWING_TEMPLATES_SUCCESS:
        case FETCH_ALL_TEMPLATES_SUCCESS:
            return {
                ...state,
                ...convertArrToObj(formatQuestions(action.payload.questions))
            };
        case EDIT_TEMPLATE_QUESTION_SUCCESS:
            // TODO: CHECK
            return updateObj(state, action.questions.id, action.questions);
        default:
            return state;
    }
}

function selectedQuestionIDReducer(state = 0, action) {
    switch (action.type) {
        case SELECT_QUESTION:
            return action.id;
        default:
            return state;
    }
}
