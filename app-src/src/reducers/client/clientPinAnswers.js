import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import { CLIENT_FETCH_SINGLE_PIN_REQUEST, CLIENT_FETCH_SINGLE_PIN_SUCCESS } from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    answers: answersReducer
});

function answersReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_SINGLE_PIN_REQUEST:
            return {};
        case CLIENT_FETCH_SINGLE_PIN_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload.answers) };
        default:
            return state;
    }
}
