import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';

import {
    FETCH_ADMIN_PIN_OPTION_VERSIONS_FAILURE,
    FETCH_ADMIN_PIN_OPTION_VERSIONS_REQUEST,
    FETCH_ADMIN_PIN_OPTION_VERSIONS_SUCCESS,
} from '../../constants/actionTypes/pinOptions';

export default combineReducers({
    versions: versionsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_VERSIONS_REQUEST:
            return true;
        case FETCH_ADMIN_PIN_OPTION_VERSIONS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTION_VERSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_VERSIONS_REQUEST:
            return null;
        case FETCH_ADMIN_PIN_OPTION_VERSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function versionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_VERSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
