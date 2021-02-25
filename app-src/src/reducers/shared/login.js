import { combineReducers } from 'redux';

import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
    POST_LOGIN_TWO_FACTOR_REQUIRED,
} from 'constants/actionTypes/auth';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    showTwoFactor: showTwoFactorReducer,
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_LOGIN_REQUEST:
        case POST_LOGIN_FAILURE:
        case POST_LOGIN_TWO_FACTOR_REQUIRED:
            return false;
        case POST_LOGIN_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_LOGIN_REQUEST:
            return null;
        case POST_LOGIN_FAILURE:
            return 'An error has occured.';
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_LOGIN_FAILURE:
        case POST_LOGIN_SUCCESS:
        case POST_LOGIN_TWO_FACTOR_REQUIRED:
        case SET_API_FIELD_ERRORS:
            return false;
        case POST_LOGIN_REQUEST:
            return true;
        default:
            return state;
    }
}

function showTwoFactorReducer(state = false, action) {
    switch (action.type) {
        case POST_LOGIN_TWO_FACTOR_REQUIRED:
            return true;
        case POST_LOGIN_SUCCESS:
            return false;
        case POST_LOGIN_FAILURE:
            return false;
        default:
            return state;
    }
}
