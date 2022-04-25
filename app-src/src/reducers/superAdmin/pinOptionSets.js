import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ADMIN_PIN_OPTION_SETS_REQUEST,
    FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS,
    FETCH_ADMIN_PIN_OPTION_SETS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export default combineReducers({
    sets: setsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_SETS_REQUEST:
            return true;
        case FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTION_SETS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_SETS_REQUEST:
            return null;
        case FETCH_ADMIN_PIN_OPTION_SETS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function setsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
