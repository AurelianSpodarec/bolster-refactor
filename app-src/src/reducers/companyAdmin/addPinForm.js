import { combineReducers } from 'redux';
import {
    UPDATE_ADD_PIN_ANSWER,
    RESET_PIN_ANSWERS,
    UPDATE_ADD_PIN_STATUS,
    RESET_PIN_ANSWER,
    SET_SERVICE_ID,
} from 'constants/actionTypes/drawings';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    answers: answersReducer,
    status: statusReducer,
    serviceID: serviceIDReducer,
});

function answersReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_ADD_PIN_ANSWER:
            return updateObj(state, action.key, action.value);
        case RESET_PIN_ANSWERS:
            return {};
        case RESET_PIN_ANSWER:
            return updateObj(state, action.id, action.value);
        default:
            return state;
    }
}

function statusReducer(state = '', action) {
    switch (action.type) {
        case UPDATE_ADD_PIN_STATUS:
            return action.value;
        default:
            return state;
    }
}

function serviceIDReducer(state = null, action) {
    switch (action.type) {
        case SET_SERVICE_ID:
            return action.serviceID;
        default:
            return state;
    }
}
