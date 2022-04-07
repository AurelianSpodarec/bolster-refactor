import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTIONS_REQUEST,
    FETCH_PIN_OPTIONS_SUCCESS,
    FETCH_PIN_OPTIONS_FAILURE,
    CREATE_PIN_OPTION_VALUE_REQUEST,
    CREATE_PIN_OPTION_VALUE_SUCCESS,
    CREATE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

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
        case FETCH_PIN_OPTIONS_REQUEST:
            return true;
        case FETCH_PIN_OPTIONS_SUCCESS:
        case FETCH_PIN_OPTIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTIONS_REQUEST:
            return null;
        case FETCH_PIN_OPTIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
            return true;
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case CREATE_PIN_OPTION_VALUE_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
            return null;
        case CREATE_PIN_OPTION_VALUE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
            return false;
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function optionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
