import { combineReducers } from 'redux';

import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
} from 'constants/actionTypes/auth';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer
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
            return action.error.message;
        default:
            return state;
    }
}
