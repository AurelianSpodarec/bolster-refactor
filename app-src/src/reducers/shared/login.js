import { combineReducers } from 'redux';

import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
} from 'constants/actionTypes/auth';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_LOGIN_REQUEST:
        case POST_LOGIN_FAILURE:
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
        case SET_API_FIELD_ERRORS:
            return false;
        case POST_LOGIN_REQUEST:
            return true;
        default:
            return state;
    }
}
