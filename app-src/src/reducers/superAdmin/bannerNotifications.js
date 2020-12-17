import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import {
    FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE,
    FETCH_ALL_BANNER_NOTIFICATIONS_REQUEST,
    FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS,
    EDIT_BANNER_NOTIFICATION_FAILURE,
    EDIT_BANNER_NOTIFICATION_REQUEST,
    EDIT_BANNER_NOTIFICATION_SUCCESS,
    ADD_BANNER_NOTIFICATION_FAILURE,
    ADD_BANNER_NOTIFICATION_REQUEST,
    ADD_BANNER_NOTIFICATION_SUCCESS,
    DELETE_BANNER_NOTIFICATION_SUCCESS,
} from 'constants/actionTypes/superAdminBannerNotifications';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    bannerNotifications: bannerNotificationsReducer,
    postSuccess: postSuccessReducer,
    isPosting: isPostingReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_BANNER_NOTIFICATIONS_REQUEST:
            return true;
        case FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS:
        case FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_BANNER_NOTIFICATIONS_REQUEST:
        case EDIT_BANNER_NOTIFICATION_REQUEST:
        case ADD_BANNER_NOTIFICATION_REQUEST:
            return null;
        case FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE:
        case EDIT_BANNER_NOTIFICATION_FAILURE:
        case ADD_BANNER_NOTIFICATION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function bannerNotificationsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case EDIT_BANNER_NOTIFICATION_SUCCESS:
        case ADD_BANNER_NOTIFICATION_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_BANNER_NOTIFICATION_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_BANNER_NOTIFICATION_REQUEST:
        case ADD_BANNER_NOTIFICATION_REQUEST:
            return false;
        case EDIT_BANNER_NOTIFICATION_SUCCESS:
        case ADD_BANNER_NOTIFICATION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case EDIT_BANNER_NOTIFICATION_REQUEST:
        case ADD_BANNER_NOTIFICATION_REQUEST:
            return true;
        case EDIT_BANNER_NOTIFICATION_SUCCESS:
        case ADD_BANNER_NOTIFICATION_SUCCESS:
        case ADD_BANNER_NOTIFICATION_FAILURE:
            return false;
        default:
            return state;
    }
}
