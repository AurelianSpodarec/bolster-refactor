import { combineReducers } from 'redux';

import {
    FETCH_ACTIVITY_LOG_REQUEST,
    FETCH_ACTIVITY_LOG_SUCCESS,
    FETCH_ACTIVITY_LOG_FAILURE,
    FETCH_ACTIVITY_LOG_SETTINGS_REQUEST,
    FETCH_ACTIVITY_LOG_SETTINGS_SUCCESS,
    FETCH_ACTIVITY_LOG_SETTINGS_FAILURE,
    POST_ACTIVITY_LOG_SETTINGS_REQUEST,
    POST_ACTIVITY_LOG_SETTINGS_SUCCESS,
    POST_ACTIVITY_LOG_SETTINGS_FAILURE,
} from 'constants/actionTypes/activityLog';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    activityLog: activityLogReducer,
    settings: settingsReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postError: postErrorReducer,
    success: successReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ACTIVITY_LOG_REQUEST:
        case FETCH_ACTIVITY_LOG_SETTINGS_REQUEST:
            return true;
        case FETCH_ACTIVITY_LOG_SUCCESS:
        case FETCH_ACTIVITY_LOG_FAILURE:
        case FETCH_ACTIVITY_LOG_SETTINGS_SUCCESS:
        case FETCH_ACTIVITY_LOG_SETTINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_ACTIVITY_LOG_SETTINGS_REQUEST:
            return true;
        case POST_ACTIVITY_LOG_SETTINGS_SUCCESS:
        case POST_ACTIVITY_LOG_SETTINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ACTIVITY_LOG_REQUEST:
        case FETCH_ACTIVITY_LOG_SETTINGS_REQUEST:
            return null;
        case FETCH_ACTIVITY_LOG_FAILURE:
        case FETCH_ACTIVITY_LOG_SETTINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case POST_ACTIVITY_LOG_SETTINGS_REQUEST:
            return null;
        case POST_ACTIVITY_LOG_SETTINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function successReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ACTIVITY_LOG_REQUEST:
        case FETCH_ACTIVITY_LOG_SETTINGS_REQUEST:
        case POST_ACTIVITY_LOG_SETTINGS_REQUEST:
            return false;
        case FETCH_ACTIVITY_LOG_SUCCESS:
        case FETCH_ACTIVITY_LOG_SETTINGS_SUCCESS:
        case POST_ACTIVITY_LOG_SETTINGS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function activityLogReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ACTIVITY_LOG_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function settingsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ACTIVITY_LOG_SETTINGS_REQUEST:
            return [];
        case FETCH_ACTIVITY_LOG_SETTINGS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
