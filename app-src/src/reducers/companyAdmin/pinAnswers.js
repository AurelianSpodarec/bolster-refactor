import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_REQUEST
} from 'constants/actionTypes/pins';

export default combineReducers({
    answers: answersReducer
});

function answersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_REQUEST:
            return {};
        case FETCH_SINGLE_PIN_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload.answers) };
        default:
            return state;
    }
}
