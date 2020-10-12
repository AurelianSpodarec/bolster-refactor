import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_LOGIN_TEXT_REQUEST,
    ADMIN_FETCH_LOGIN_TEXT_FAILURE,
    ADMIN_FETCH_LOGIN_TEXT_SUCCESS,
    ADMIN_FETCH_REGISTER_TEXT_REQUEST,
    ADMIN_FETCH_REGISTER_TEXT_FAILURE,
    ADMIN_FETCH_REGISTER_TEXT_SUCCESS,
    ADMIN_UPDATE_FRONTEND_TEXT_REQUEST,
    ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS,
    ADMIN_UPDATE_FRONTEND_TEXT_FAILURE,
} from 'constants/actionTypes/frontendTextSettings';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    registerText: registerTextReducer,
    loginText: loginTextReducer,
    isPosting: isPostingReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_LOGIN_TEXT_REQUEST:
        case ADMIN_FETCH_REGISTER_TEXT_REQUEST:
        case ADMIN_UPDATE_FRONTEND_TEXT_REQUEST:
            return null;
        case ADMIN_FETCH_LOGIN_TEXT_FAILURE:
        case ADMIN_FETCH_REGISTER_TEXT_FAILURE:
        case ADMIN_UPDATE_FRONTEND_TEXT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_LOGIN_TEXT_REQUEST:
        case ADMIN_FETCH_REGISTER_TEXT_REQUEST:
            return true;
        case ADMIN_FETCH_LOGIN_TEXT_SUCCESS:
        case ADMIN_FETCH_LOGIN_TEXT_FAILURE:
        case ADMIN_FETCH_REGISTER_TEXT_SUCCESS:
        case ADMIN_FETCH_REGISTER_TEXT_FAILURE:
            return false;
        default:
            return state;
    }
}

function loginTextReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_LOGIN_TEXT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function registerTextReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_REGISTER_TEXT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_UPDATE_FRONTEND_TEXT_REQUEST:
            return true;
        case ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS:
        case ADMIN_UPDATE_FRONTEND_TEXT_FAILURE:
            return false;
        default:
            return state;
    }
}
