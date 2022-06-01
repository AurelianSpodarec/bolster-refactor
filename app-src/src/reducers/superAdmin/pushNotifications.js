import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import {
    FETCH_ADMIN_PUSH_NOTIFICATIONS_REQUEST,
    FETCH_ADMIN_PUSH_NOTIFICATIONS_SUCCESS,
    FETCH_ADMIN_PUSH_NOTIFICATIONS_FAILURE,
    CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST,
    CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE,
    EDIT_ADMIN_PUSH_NOTIFICATION_REQUEST,
    EDIT_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    EDIT_ADMIN_PUSH_NOTIFICATION_FAILURE,
    DELETE_ADMIN_PUSH_NOTIFICATION_REQUEST,
    DELETE_ADMIN_PUSH_NOTIFICATION_SUCCESS,
    DELETE_ADMIN_PUSH_NOTIFICATION_FAILURE,
} from 'constants/actionTypes/pushNotifications';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

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
        case CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case EDIT_ADMIN_PUSH_NOTIFICATION_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST:
        case EDIT_ADMIN_PUSH_NOTIFICATION_REQUEST:
        case DELETE_ADMIN_PUSH_NOTIFICATION_REQUEST:
            return true;
        case CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE:
        case EDIT_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case EDIT_ADMIN_PUSH_NOTIFICATION_FAILURE:
        case DELETE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case DELETE_ADMIN_PUSH_NOTIFICATION_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST:
        case EDIT_ADMIN_PUSH_NOTIFICATION_REQUEST:
        case DELETE_ADMIN_PUSH_NOTIFICATION_REQUEST:
            return false;
        case CREATE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case EDIT_ADMIN_PUSH_NOTIFICATION_SUCCESS:
        case DELETE_ADMIN_PUSH_NOTIFICATION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_ADMIN_PUSH_NOTIFICATION_REQUEST:
        case EDIT_ADMIN_PUSH_NOTIFICATION_REQUEST:
        case DELETE_ADMIN_PUSH_NOTIFICATION_REQUEST:
            return null;
        case CREATE_ADMIN_PUSH_NOTIFICATION_FAILURE:
        case EDIT_ADMIN_PUSH_NOTIFICATION_FAILURE:
        case DELETE_ADMIN_PUSH_NOTIFICATION_FAILURE:
            return action.error;
        default:
            return state;
    }
}
