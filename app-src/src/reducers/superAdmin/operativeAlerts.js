import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_ALL_OPERATIVE_ALERTS_SUCCESS,
    ADMIN_FETCH_ALL_OPERATIVE_ALERTS_REQUEST,
    ADMIN_FETCH_ALL_OPERATIVE_ALERTS_FAILURE,
    ADMIN_CREATE_OPERATIVE_ALERT_REQUEST,
    ADMIN_CREATE_OPERATIVE_ALERT_SUCCESS,
    ADMIN_CREATE_OPERATIVE_ALERT_FAILURE
} from 'constants/actionTypes/operativeAlerts';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    operativeAlerts: operativeAlertsReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_ALL_OPERATIVE_ALERTS_REQUEST:
            return true;
        case ADMIN_FETCH_ALL_OPERATIVE_ALERTS_SUCCESS:
        case ADMIN_FETCH_ALL_OPERATIVE_ALERTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_ALL_OPERATIVE_ALERTS_REQUEST:
        case ADMIN_CREATE_OPERATIVE_ALERT_REQUEST:
            return null;
        case ADMIN_FETCH_ALL_OPERATIVE_ALERTS_FAILURE:
        case ADMIN_CREATE_OPERATIVE_ALERT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_CREATE_OPERATIVE_ALERT_REQUEST:
            return false;
        case ADMIN_CREATE_OPERATIVE_ALERT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function operativeAlertsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_ALL_OPERATIVE_ALERTS_SUCCESS:
            return convertArrToObj(action.payload);
        case ADMIN_CREATE_OPERATIVE_ALERT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
