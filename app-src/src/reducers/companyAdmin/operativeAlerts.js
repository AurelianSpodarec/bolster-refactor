import { combineReducers } from 'redux';

import {
    FETCH_ALL_OPERATIVE_ALERTS_REQUEST,
    FETCH_ALL_OPERATIVE_ALERTS_SUCCESS,
    FETCH_ALL_OPERATIVE_ALERTS_FAILURE,
    CREATE_OPERATIVE_ALERT_REQUEST,
    CREATE_OPERATIVE_ALERT_SUCCESS,
    CREATE_OPERATIVE_ALERT_FAILURE,
    FETCH_OPERATIVE_ALERT_DELIVERIES_SUCCESS,
    FETCH_OPERATIVE_ALERT_DELIVERIES_REQUEST,
    FETCH_OPERATIVE_ALERT_DELIVERIES_FAILURE
} from 'constants/actionTypes/operativeAlerts';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    operativeAlerts: operativeAlertsReducer,
    operativeAlertMetrics: operativeAlertMetricsReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_OPERATIVE_ALERTS_REQUEST:
        case FETCH_OPERATIVE_ALERT_DELIVERIES_REQUEST:
            return true;
        case FETCH_ALL_OPERATIVE_ALERTS_SUCCESS:
        case FETCH_ALL_OPERATIVE_ALERTS_FAILURE:
        case FETCH_OPERATIVE_ALERT_DELIVERIES_SUCCESS:
        case FETCH_OPERATIVE_ALERT_DELIVERIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_OPERATIVE_ALERTS_REQUEST:
        case CREATE_OPERATIVE_ALERT_REQUEST:
        case FETCH_OPERATIVE_ALERT_DELIVERIES_REQUEST:
            return null;
        case FETCH_ALL_OPERATIVE_ALERTS_FAILURE:
        case CREATE_OPERATIVE_ALERT_FAILURE:
        case FETCH_OPERATIVE_ALERT_DELIVERIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_OPERATIVE_ALERT_REQUEST:
            return false;
        case CREATE_OPERATIVE_ALERT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function operativeAlertsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_OPERATIVE_ALERTS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_OPERATIVE_ALERT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function operativeAlertMetricsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OPERATIVE_ALERT_DELIVERIES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}
