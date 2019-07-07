import { combineReducers } from 'redux';

import { updateObj, convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_SINGLE_PIN_REQUEST,
    CLIENT_FETCH_SINGLE_PIN_SUCCESS,
    CLIENT_FETCH_SINGLE_PIN_FAILURE,
    CLIENT_FETCH_PINS_REQUEST,
    CLIENT_FETCH_PINS_SUCCESS,
    CLIENT_FETCH_PINS_FAILURE
} from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    pins: pinsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_SINGLE_PIN_REQUEST:
        case CLIENT_FETCH_PINS_REQUEST:
            return true;
        case CLIENT_FETCH_SINGLE_PIN_SUCCESS:
        case CLIENT_FETCH_SINGLE_PIN_FAILURE:
        case CLIENT_FETCH_PINS_SUCCESS:
        case CLIENT_FETCH_PINS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_SINGLE_PIN_REQUEST:
        case CLIENT_FETCH_PINS_REQUEST:
            return null;
        case CLIENT_FETCH_SINGLE_PIN_FAILURE:
        case CLIENT_FETCH_PINS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_PINS_REQUEST:
            return {};
        case CLIENT_FETCH_SINGLE_PIN_SUCCESS:
            return updateObj(state, action.payload.pin.id, action.payload.pin);
        case CLIENT_FETCH_PINS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
