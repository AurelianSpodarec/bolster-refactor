import { combineReducers } from 'redux';

import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILURE
} from 'constants/actionTypes/auth';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_REGISTER_REQUEST:
        case POST_REGISTER_FAILURE:
            return false;
        case POST_REGISTER_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_REGISTER_REQUEST:
            return null;

        case POST_REGISTER_FAILURE:
            return action.error;
        default:
            return state;
    }
}
