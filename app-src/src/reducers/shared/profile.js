import { combineReducers } from 'redux';

import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    CHANGE_PROFILE_PASSWORD_REQUEST,
    CHANGE_PROFILE_PASSWORD_SUCCESS,
    CHANGE_PROFILE_PASSWORD_FAILURE,
    CHANGE_PROFILE_EMAIL_REQUEST,
    CHANGE_PROFILE_EMAIL_FAILURE,
    CHANGE_PROFILE_EMAIL_SUCCESS,
} from 'constants/actionTypes/profile';
import { POST_RECENT_UPDATES_SUCCESS } from 'constants/actionTypes/recentUpdates';
import { updateObj } from 'helpers/generic';
import {
    POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE,
    POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST,
    POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS,
    POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE,
    POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST,
    POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS,
    POST_SETUP_TWO_FACTOR_FAILURE,
    POST_SETUP_TWO_FACTOR_REQUEST,
    POST_SETUP_TWO_FACTOR_SUCCESS,
} from 'constants/actionTypes/auth';

export default combineReducers({
    profile: profileReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return true;
        case FETCH_PROFILE_SUCCESS:
        case FETCH_PROFILE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
        case EDIT_PROFILE_REQUEST:
        case POST_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST:
        case CHANGE_PROFILE_EMAIL_REQUEST:
            return null;
        case FETCH_PROFILE_FAILURE:
        case EDIT_PROFILE_FAILURE:
        case POST_SETUP_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE:
        case CHANGE_PROFILE_EMAIL_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
        case CHANGE_PROFILE_PASSWORD_REQUEST:
        case POST_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST:
        case CHANGE_PROFILE_EMAIL_REQUEST:
            return true;
        case EDIT_PROFILE_SUCCESS:
        case EDIT_PROFILE_FAILURE:
        case CHANGE_PROFILE_PASSWORD_SUCCESS:
        case CHANGE_PROFILE_PASSWORD_FAILURE:
        case POST_SETUP_TWO_FACTOR_FAILURE:
        case POST_SETUP_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_SETUP_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_FAILURE:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS:
        case CHANGE_PROFILE_EMAIL_FAILURE:
        case CHANGE_PROFILE_EMAIL_SUCCESS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
        case EDIT_PROFILE_FAILURE:
        case CHANGE_PROFILE_PASSWORD_REQUEST:
        case CHANGE_PROFILE_PASSWORD_FAILURE:
        case POST_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_SETUP_TWO_FACTOR_REQUEST:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_REQUEST:
        case CHANGE_PROFILE_EMAIL_REQUEST:
            return false;
        case EDIT_PROFILE_SUCCESS:
        case CHANGE_PROFILE_PASSWORD_SUCCESS:
        case POST_SETUP_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS:
        case CHANGE_PROFILE_EMAIL_SUCCESS:
            return true;
        default:
            return state;
    }
}

function profileReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PROFILE_SUCCESS:
        case POST_RECENT_UPDATES_SUCCESS:
        case POST_CONFIRM_SETUP_TWO_FACTOR_SUCCESS:
        case POST_CONFIRM_DISABLE_TWO_FACTOR_SUCCESS:
            return action.payload;
        case EDIT_PROFILE_SUCCESS:
            return updateObj(state, 'profile', action.payload);
        default:
            return state;
    }
}
