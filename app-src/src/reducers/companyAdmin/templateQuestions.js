import { combineReducers } from 'redux';

import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';
import { FETCH_ALL_TEMPLATES_SUCCESS } from 'constants/actionTypes/templates';

export default combineReducers({
    questions: questionsReducer
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
