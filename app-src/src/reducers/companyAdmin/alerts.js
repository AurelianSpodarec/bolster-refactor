import {
    FETCH_ALL_ALERTS_FAILURE,
    FETCH_ALL_ALERTS_REQUEST,
    FETCH_ALL_ALERTS_SUCCESS,
    FETCH_HIERARCHY_ALERTS_REQUEST,
    FETCH_HIERARCHY_ALERTS_SUCCESS,
    FETCH_HIERARCHY_ALERTS_FAILURE,
} from 'constants/actionTypes/alerts';
import { convertArrToObj, updateObj } from 'helpers/generic';
import { combineReducers } from 'redux';

export default combineReducers({
    isFetching: isFetchingReducer,
    alerts: alertsReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_ALERTS_REQUEST:
        case FETCH_HIERARCHY_ALERTS_REQUEST:
            return true;
        case FETCH_ALL_ALERTS_SUCCESS:
        case FETCH_HIERARCHY_ALERTS_SUCCESS:
        case FETCH_ALL_ALERTS_FAILURE:
        case FETCH_HIERARCHY_ALERTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function alertsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_ALERTS_REQUEST:
            return {};
        case FETCH_ALL_ALERTS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_HIERARCHY_ALERTS_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_HIERARCHY_ALERTS_SUCCESS:
        case FETCH_ALL_ALERTS_SUCCESS:
            return null;
        case FETCH_HIERARCHY_ALERTS_FAILURE:
        case FETCH_ALL_ALERTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
