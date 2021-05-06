import { combineReducers } from 'redux';
import {
    FETCH_AUTH_AREA_TEXT_REQUEST,
    FETCH_AUTH_AREA_TEXT_SUCCESS,
    FETCH_AUTH_AREA_TEXT_FAILURE,
    POST_EMAIL_CONFIRMATION_REQUEST,
    POST_RESEND_EMAIL_CONFIRMATION_REQUEST,
    POST_EMAIL_CONFIRMATION_FAILURE,
    POST_RESEND_EMAIL_CONFIRMATION_FAILURE,
    POST_EMAIL_CONFIRMATION_SUCCESS,
    POST_RESEND_EMAIL_CONFIRMATION_SUCCESS,
    POST_ACCEPT_INVITATION_REQUEST,
    POST_ACCEPT_INVITATION_FAILURE,
    POST_ACCEPT_INVITATION_SUCCESS,
    POST_PASSWORD_RESET_REQUEST,
    POST_PASSWORD_RESET_FAILURE,
    POST_PASSWORD_RESET_SUCCESS,
    POST_CHANGE_EMAIL_CONFIRMATION_REQUEST,
    POST_CHANGE_EMAIL_CONFIRMATION_SUCCESS,
    POST_CHANGE_EMAIL_CONFIRMATION_FAILURE,
} from 'constants/actionTypes/auth';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_AUTH_AREA_TEXT_REQUEST:
        case POST_EMAIL_CONFIRMATION_REQUEST:
        case POST_ACCEPT_INVITATION_REQUEST:
        case POST_PASSWORD_RESET_REQUEST:
            return false;
        case FETCH_AUTH_AREA_TEXT_FAILURE:
        case POST_EMAIL_CONFIRMATION_FAILURE:
        case POST_PASSWORD_RESET_FAILURE:
        case POST_ACCEPT_INVITATION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function authReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_AUTH_AREA_TEXT_REQUEST:
            return {};
        case FETCH_AUTH_AREA_TEXT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_AUTH_AREA_TEXT_REQUEST:
            return true;
        case FETCH_AUTH_AREA_TEXT_SUCCESS:
        case FETCH_AUTH_AREA_TEXT_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_EMAIL_CONFIRMATION_REQUEST:
        case POST_RESEND_EMAIL_CONFIRMATION_REQUEST:
        case POST_ACCEPT_INVITATION_REQUEST:
        case POST_PASSWORD_RESET_REQUEST:
        case POST_CHANGE_EMAIL_CONFIRMATION_REQUEST:
            return true;
        case POST_EMAIL_CONFIRMATION_FAILURE:
        case POST_RESEND_EMAIL_CONFIRMATION_FAILURE:
        case POST_EMAIL_CONFIRMATION_SUCCESS:
        case POST_RESEND_EMAIL_CONFIRMATION_SUCCESS:
        case POST_ACCEPT_INVITATION_FAILURE:
        case POST_ACCEPT_INVITATION_SUCCESS:
        case POST_PASSWORD_RESET_FAILURE:
        case POST_PASSWORD_RESET_SUCCESS:
        case POST_CHANGE_EMAIL_CONFIRMATION_SUCCESS:
        case POST_CHANGE_EMAIL_CONFIRMATION_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_EMAIL_CONFIRMATION_REQUEST:
        case POST_RESEND_EMAIL_CONFIRMATION_REQUEST:
        case POST_ACCEPT_INVITATION_REQUEST:
        case POST_PASSWORD_RESET_REQUEST:
        case POST_CHANGE_EMAIL_CONFIRMATION_REQUEST:
            return false;
        case POST_EMAIL_CONFIRMATION_SUCCESS:
        case POST_RESEND_EMAIL_CONFIRMATION_SUCCESS:
        case POST_ACCEPT_INVITATION_SUCCESS:
        case POST_PASSWORD_RESET_SUCCESS:
        case POST_CHANGE_EMAIL_CONFIRMATION_SUCCESS:
            return true;
        default:
            return state;
    }
}
