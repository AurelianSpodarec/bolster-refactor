import { combineReducers } from 'redux';

import {
    FETCH_SINGLE_BANNER_NOTIFICATIONS_FAILURE,
    FETCH_SINGLE_BANNER_NOTIFICATIONS_REQUEST,
    FETCH_SINGLE_BANNER_NOTIFICATIONS_SUCCESS,
    UPDATE_BANNER_NOTIFICATIONS_FAILURE,
    UPDATE_BANNER_NOTIFICATIONS_REQUEST,
    UPDATE_BANNER_NOTIFICATIONS_SUCCESS,
} from 'constants/actionTypes/companyAdminBanner';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    bannerNotifications: bannerNotificationsReducer,

    postSuccess: postSuccessReducer,
    isPosting: isPostingReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SINGLE_BANNER_NOTIFICATIONS_REQUEST:
            return true;
        case FETCH_SINGLE_BANNER_NOTIFICATIONS_SUCCESS:
        case FETCH_SINGLE_BANNER_NOTIFICATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SINGLE_BANNER_NOTIFICATIONS_REQUEST:
            return null;
        case FETCH_SINGLE_BANNER_NOTIFICATIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function bannerNotificationsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_BANNER_NOTIFICATIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_BANNER_NOTIFICATIONS_REQUEST:
            return false;
        case UPDATE_BANNER_NOTIFICATIONS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_BANNER_NOTIFICATIONS_REQUEST:
            return true;
        case UPDATE_BANNER_NOTIFICATIONS_SUCCESS:
        case UPDATE_BANNER_NOTIFICATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}
