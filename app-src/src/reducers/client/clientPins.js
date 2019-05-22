import { combineReducers } from 'redux';

import { updateObj, convertArrToObj } from 'helpers/generic';
import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_FAILURE,
    FETCH_PINS_REQUEST,
    FETCH_PINS_SUCCESS,
    FETCH_PINS_FAILURE
} from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    pins: pinsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_REQUEST:
        case FETCH_PINS_REQUEST:
            return true;
        case FETCH_SINGLE_PIN_SUCCESS:
        case FETCH_SINGLE_PIN_FAILURE:
        case FETCH_PINS_SUCCESS:
        case FETCH_PINS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_REQUEST:
        case FETCH_PINS_REQUEST:
        case CREATE_PIN_REQUEST:
        case EDIT_PIN_LOCATION_REQUEST:
        case EDIT_PIN_HISTORY_REQUEST:
        case DELETE_PIN_HISTORY_REQUEST:
            return null;
        case FETCH_SINGLE_PIN_FAILURE:
        case FETCH_PINS_FAILURE:
        case CREATE_PIN_FAILURE:
        case EDIT_PIN_LOCATION_FAILURE:
        case EDIT_PIN_HISTORY_FAILURE:
        case DELETE_PIN_HISTORY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_SUCCESS:
        case CREATE_PIN_SUCCESS:
        case EDIT_PIN_LOCATION_SUCCESS:
            return updateObj(state, action.payload.pin.id, action.payload.pin);
        case EDIT_PIN_HISTORY_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case FETCH_PINS_SUCCESS:
            return convertArrToObj(action.payload);
        case EDIT_PIN_LOCATION_REQUEST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    latitude: action.lat,
                    longitude: action.lng
                }
            };
        default:
            return state;
    }
}
