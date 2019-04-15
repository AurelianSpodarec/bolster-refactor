import { combineReducers } from 'redux';
import {
    UPDATE_ADD_PIN_ANSWER,
    RESET_PIN_ANSWERS
} from 'constants/actionTypes/drawings';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    answers: answersReducer
});

function answersReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_ADD_PIN_ANSWER:
            return updateObj(state, action.key, action.value);
        case RESET_PIN_ANSWERS:
            return {};
        default:
            return state;
    }
}
