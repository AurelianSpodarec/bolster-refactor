import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ADMIN_PUSH_NOTIFICATIONS_REQUEST,
    FETCH_ADMIN_PUSH_NOTIFICATIONS_SUCCESS,
    FETCH_ADMIN_PUSH_NOTIFICATIONS_FAILURE,
    CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST,
    CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/pushNotifications';

export default combineReducers({
    pushNotifications: pushNotificationsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PUSH_NOTIFICATIONS_REQUEST:
            return true;
        case FETCH_ADMIN_PUSH_NOTIFICATIONS_SUCCESS:
        case FETCH_ADMIN_PUSH_NOTIFICATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_PUSH_NOTIFICATIONS_REQUEST:
            return null;
        case FETCH_ADMIN_PUSH_NOTIFICATIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pushNotificationsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ADMIN_PUSH_NOTIFICATIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST:
            return true;
        case CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST:
            return false;
        case CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST:
            return null;
        case CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE:
            return action.error;
        default:
            return state;
    }
}
