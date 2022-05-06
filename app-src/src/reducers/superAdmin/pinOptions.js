import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ADMIN_PIN_OPTIONS_REQUEST,
    FETCH_ADMIN_PIN_OPTIONS_SUCCESS,
    FETCH_ADMIN_PIN_OPTIONS_FAILURE,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_FAILURE,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_REQUEST,
} from 'constants/actionTypes/pinOptions';

export default combineReducers({
    options: optionsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_REQUEST:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_REQUEST:
            return true;
        case FETCH_ADMIN_PIN_OPTIONS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FAILURE:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_REQUEST:
            return null;
        case FETCH_ADMIN_PIN_OPTIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function optionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
