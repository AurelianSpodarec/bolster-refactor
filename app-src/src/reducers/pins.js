import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS,
    FETCH_SINGLE_PIN_FAILURE
} from 'constants/actionTypes/pins';

export default combineReducers({
    pins: pinsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_REQUEST:
            return true;
        case FETCH_SINGLE_PIN_SUCCESS:
        case FETCH_SINGLE_PIN_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_REQUEST:
            return null;
        case FETCH_SINGLE_PIN_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function pinsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
