import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE,
    FETCH_ALL_BANNER_NOTIFICATIONS_REQUEST,
    FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS,
} from 'constants/actionTypes/superAdminBannerNotifications';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    bannerNotifications: bannerNotificationsReducer,
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
            return null;
        case FETCH_ALL_BANNER_NOTIFICATIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function bannerNotificationsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_BANNER_NOTIFICATIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
