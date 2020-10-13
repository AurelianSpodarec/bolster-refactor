import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_FRONTEND_TEXT_REQUEST,
    ADMIN_FETCH_FRONTEND_TEXT_FAILURE,
    ADMIN_FETCH_FRONTEND_TEXT_SUCCESS,
    ADMIN_UPDATE_FRONTEND_TEXT_REQUEST,
    ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS,
    ADMIN_UPDATE_FRONTEND_TEXT_FAILURE,
} from 'constants/actionTypes/frontendTextSettings';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    frontendText: frontendTextReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    lastFetchedDate: lastFetchedDateReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_FRONTEND_TEXT_REQUEST:
        case ADMIN_UPDATE_FRONTEND_TEXT_REQUEST:
            return null;
        case ADMIN_FETCH_FRONTEND_TEXT_FAILURE:
        case ADMIN_UPDATE_FRONTEND_TEXT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_FRONTEND_TEXT_REQUEST:
            return true;
        case ADMIN_FETCH_FRONTEND_TEXT_SUCCESS:
        case ADMIN_FETCH_FRONTEND_TEXT_FAILURE:
            return false;
        default:
            return state;
    }
}

function frontendTextReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_FRONTEND_TEXT_SUCCESS:
        case ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS:
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS:
            return true;
        case ADMIN_UPDATE_FRONTEND_TEXT_REQUEST:
        case ADMIN_UPDATE_FRONTEND_TEXT_FAILURE:
            return false;
        default:
            return state;
    }
}

function lastFetchedDateReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_FRONTEND_TEXT_SUCCESS:
        case ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS:
            return Date.now();
        default:
            return state;
    }
}
