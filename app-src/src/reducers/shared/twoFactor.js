import {
    POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE,
    POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST,
    POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS,
    POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE,
    POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST,
    POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS,
    POST_DISABLE_TWO_FACTOR_FAILURE,
    POST_DISABLE_TWO_FACTOR_REQUEST,
    POST_DISABLE_TWO_FACTOR_SUCCESS,
    POST_SETUP_TWO_FACTOR_FAILURE,
    POST_SETUP_TWO_FACTOR_REQUEST,
    POST_SETUP_TWO_FACTOR_SUCCESS,
} from 'constants/actionTypes/auth';
import { combineReducers } from 'redux';

export default combineReducers({
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST:
        case POST_DISABLE_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST:
            return null;
        case POST_SETUP_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE:
        case POST_DISABLE_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST:
        case POST_DISABLE_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST:
            return true;
        case POST_SETUP_TWO_FACTOR_SUCCESS:
        case POST_SETUP_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS:
        case POST_DISABLE_TWO_FACTOR_SUCCESS:
        case POST_DISABLE_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST:
        case POST_DISABLE_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST:
            return false;
        case POST_SETUP_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS:
        case POST_DISABLE_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS:
            return true;
        default:
            return state;
    }
}
