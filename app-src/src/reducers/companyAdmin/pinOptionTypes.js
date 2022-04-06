import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_TYPES_REQUEST,
    FETCH_PIN_OPTION_TYPES_SUCCESS,
    FETCH_PIN_OPTION_TYPES_FAILURE,
} from 'constants/actionTypes/pinOptions';

export default combineReducers({
    types: typesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_TYPES_REQUEST:
            return true;
        case FETCH_PIN_OPTION_TYPES_SUCCESS:
        case FETCH_PIN_OPTION_TYPES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_TYPES_REQUEST:
            return null;
        case FETCH_PIN_OPTION_TYPES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function typesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_TYPES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
