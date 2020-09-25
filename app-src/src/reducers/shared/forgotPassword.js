import { combineReducers } from 'redux';

import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILURE,
} from 'constants/actionTypes/auth';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_FORGOT_PASSWORD_REQUEST:
        case POST_FORGOT_PASSWORD_FAILURE:
            return false;
        case POST_FORGOT_PASSWORD_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_FORGOT_PASSWORD_REQUEST:
            return null;
        case POST_FORGOT_PASSWORD_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_FORGOT_PASSWORD_FAILURE:
        case POST_FORGOT_PASSWORD_SUCCESS:
        case SET_API_FIELD_ERRORS:
            return false;
        case POST_FORGOT_PASSWORD_REQUEST:
            return true;
        default:
            return state;
    }
}
