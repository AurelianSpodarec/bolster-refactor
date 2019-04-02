import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE
} from 'constants/actionTypes/notifications';

export default combineReducers({
    notifications: notificationsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_REQUEST:
            return true;
        case FETCH_NOTIFICATIONS_SUCCESS:
        case FETCH_NOTIFICATIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_REQUEST:
            return null;
        case FETCH_NOTIFICATIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function notificationsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
