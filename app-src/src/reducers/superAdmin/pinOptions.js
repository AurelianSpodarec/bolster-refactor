import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ADMIN_PIN_OPTIONS_REQUEST,
    FETCH_ADMIN_PIN_OPTIONS_SUCCESS,
    FETCH_ADMIN_PIN_OPTIONS_FAILURE,
    ENABLE_ADMIN_PIN_OPTION_VALUE_REQUEST,
    DISABLE_ADMIN_PIN_OPTION_VALUE_REQUEST,
    ENABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS,
    ENABLE_ADMIN_PIN_OPTION_VALUE_FAILURE,
    DISABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS,
    DISABLE_ADMIN_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';
import { SET_API_FIELD_ERRORS } from '../../constants/actionTypes/generic';

export default combineReducers({
    options: optionsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_REQUEST:
            return true;
        case FETCH_ADMIN_PIN_OPTIONS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FAILURE:
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
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ENABLE_ADMIN_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_ADMIN_PIN_OPTION_VALUE_REQUEST:
            return true;
        case ENABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS:
        case ENABLE_ADMIN_PIN_OPTION_VALUE_FAILURE:
        case DISABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS:
        case DISABLE_ADMIN_PIN_OPTION_VALUE_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case ENABLE_ADMIN_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_ADMIN_PIN_OPTION_VALUE_REQUEST:
            return null;
        case ENABLE_ADMIN_PIN_OPTION_VALUE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ENABLE_ADMIN_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_ADMIN_PIN_OPTION_VALUE_REQUEST:
            return false;
        case ENABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS:
        case DISABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}
