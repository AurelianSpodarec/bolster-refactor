import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_SETS_REQUEST,
    FETCH_PIN_OPTION_SETS_SUCCESS,
    FETCH_PIN_OPTION_SETS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export default combineReducers({
    sets: setsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_SETS_REQUEST:
            return true;
        case FETCH_PIN_OPTION_SETS_SUCCESS:
        case FETCH_PIN_OPTION_SETS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_SETS_REQUEST:
            return null;
        case FETCH_PIN_OPTION_SETS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function setsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_SETS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
