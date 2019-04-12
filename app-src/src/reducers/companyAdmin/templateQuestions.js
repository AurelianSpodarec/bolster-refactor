import { combineReducers } from 'redux';

import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';
import {
    FETCH_ALL_TEMPLATES_SUCCESS,
    SELECT_QUESTION
} from 'constants/actionTypes/templates';

export default combineReducers({
    questions: questionsReducer,
    selectedQuestionID: selectedQuestionIDReducer
});

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
        case FETCH_ALL_TEMPLATES_SUCCESS:
            return { ...state, ...action.payload.questions };
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
