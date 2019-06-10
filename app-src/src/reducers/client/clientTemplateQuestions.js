import { combineReducers } from 'redux';

import { CLIENT_FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/client/actionTypes/clientPins';
import { convertArrToObj } from 'helpers/generic';

import { formatQuestions } from 'helpers/templates';

export default combineReducers({
    questions: questionsReducer
});

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_TEMPLATES_SUCCESS:
            return {
                ...state,
                ...convertArrToObj(formatQuestions(action.payload.questions))
            };
        default:
            return state;
    }
}
