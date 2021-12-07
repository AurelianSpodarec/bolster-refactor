import { combineReducers } from 'redux';

import {
    FETCH_PASSWORD_REGEX_REQUEST,
    FETCH_PASSWORD_REGEX_SUCCESS,
    FETCH_PASSWORD_REGEX_FAILURE,
} from 'constants/actionTypes/auth';

export default combineReducers({
    passwordRegex: passwordRegexReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PASSWORD_REGEX_SUCCESS:
        case FETCH_PASSWORD_REGEX_FAILURE:
            return false;
        case FETCH_PASSWORD_REGEX_REQUEST:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PASSWORD_REGEX_REQUEST:
            return null;
        case FETCH_PASSWORD_REGEX_FAILURE:
            return 'An error has occured.';
        default:
            return state;
    }
}

function passwordRegexReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PASSWORD_REGEX_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
