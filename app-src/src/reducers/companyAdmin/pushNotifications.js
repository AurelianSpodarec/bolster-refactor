import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import {
    FETCH_PUSH_NOTIFICATIONS_REQUEST,
    FETCH_PUSH_NOTIFICATIONS_SUCCESS,
    FETCH_PUSH_NOTIFICATIONS_FAILURE,
    CREATE_PUSH_NOTIFICATION_REQUEST,
    CREATE_PUSH_NOTIFICATION_SUCCESS,
    CREATE_PUSH_NOTIFICATION_FAILURE,
    EDIT_PUSH_NOTIFICATION_REQUEST,
    EDIT_PUSH_NOTIFICATION_SUCCESS,
    EDIT_PUSH_NOTIFICATION_FAILURE,
    DELETE_PUSH_NOTIFICATION_REQUEST,
    DELETE_PUSH_NOTIFICATION_SUCCESS,
    DELETE_PUSH_NOTIFICATION_FAILURE,
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
        case FETCH_PUSH_NOTIFICATIONS_REQUEST:
            return true;
        case FETCH_PUSH_NOTIFICATIONS_SUCCESS:
        case FETCH_PUSH_NOTIFICATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PUSH_NOTIFICATIONS_REQUEST:
            return null;
        case FETCH_PUSH_NOTIFICATIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pushNotificationsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PUSH_NOTIFICATIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_PUSH_NOTIFICATION_SUCCESS:
        case EDIT_PUSH_NOTIFICATION_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_PUSH_NOTIFICATION_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PUSH_NOTIFICATION_REQUEST:
        case EDIT_PUSH_NOTIFICATION_REQUEST:
        case DELETE_PUSH_NOTIFICATION_REQUEST:
            return true;
        case CREATE_PUSH_NOTIFICATION_SUCCESS:
        case CREATE_PUSH_NOTIFICATION_FAILURE:
        case EDIT_PUSH_NOTIFICATION_SUCCESS:
        case EDIT_PUSH_NOTIFICATION_FAILURE:
        case DELETE_PUSH_NOTIFICATION_SUCCESS:
        case DELETE_PUSH_NOTIFICATION_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PUSH_NOTIFICATION_REQUEST:
        case EDIT_PUSH_NOTIFICATION_REQUEST:
        case DELETE_PUSH_NOTIFICATION_REQUEST:
            return false;
        case CREATE_PUSH_NOTIFICATION_SUCCESS:
        case EDIT_PUSH_NOTIFICATION_SUCCESS:
        case DELETE_PUSH_NOTIFICATION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_PUSH_NOTIFICATION_REQUEST:
        case EDIT_PUSH_NOTIFICATION_REQUEST:
        case DELETE_PUSH_NOTIFICATION_REQUEST:
            return null;
        case CREATE_PUSH_NOTIFICATION_FAILURE:
        case EDIT_PUSH_NOTIFICATION_FAILURE:
        case DELETE_PUSH_NOTIFICATION_FAILURE:
            return action.error;
        default:
            return state;
    }
}
