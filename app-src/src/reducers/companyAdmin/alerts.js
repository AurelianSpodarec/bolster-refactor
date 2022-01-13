import {
    FETCH_ALL_ALERTS_FAILURE,
    FETCH_ALL_ALERTS_REQUEST,
    FETCH_ALL_ALERTS_SUCCESS,
    FETCH_HIERARCHY_ALERTS_REQUEST,
    FETCH_HIERARCHY_ALERTS_SUCCESS,
    FETCH_HIERARCHY_ALERTS_FAILURE,
    UPDATE_ALERT_REQUEST,
    UPDATE_ALERT_SUCCESS,
    UPDATE_ALERT_FAILURE,
    DISMISS_ALERT_REQUEST,
    DISMISS_ALERT_SUCCESS,
    DISMISS_ALERT_FAILURE,
    CREATE_ALERT_REQUEST,
    CREATE_ALERT_SUCCESS,
    CREATE_ALERT_FAILURE,
} from 'constants/actionTypes/alerts';
import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import { combineReducers } from 'redux';

export default combineReducers({
    alerts: alertsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
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
        case UPDATE_ALERT_SUCCESS:
        case DISMISS_ALERT_SUCCESS:
            return removeObjItem(state, action.id);
        case CREATE_ALERT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_ALERT_REQUEST:
        case DISMISS_ALERT_REQUEST:
        case CREATE_ALERT_REQUEST:
            return true;
        case UPDATE_ALERT_SUCCESS:
        case UPDATE_ALERT_FAILURE:
        case DISMISS_ALERT_SUCCESS:
        case DISMISS_ALERT_FAILURE:
        case CREATE_ALERT_SUCCESS:
        case CREATE_ALERT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_ALERT_REQUEST:
        case UPDATE_ALERT_FAILURE:
        case DISMISS_ALERT_REQUEST:
        case DISMISS_ALERT_FAILURE:
        case CREATE_ALERT_REQUEST:
        case CREATE_ALERT_FAILURE:
            return false;
        case UPDATE_ALERT_SUCCESS:
        case DISMISS_ALERT_SUCCESS:
        case CREATE_ALERT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_HIERARCHY_ALERTS_REQUEST:
        case DISMISS_ALERT_REQUEST:
        case FETCH_ALL_ALERTS_REQUEST:
            return null;
        case DISMISS_ALERT_FAILURE:
        case FETCH_HIERARCHY_ALERTS_FAILURE:
        case FETCH_ALL_ALERTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case UPDATE_ALERT_REQUEST:
        case DISMISS_ALERT_REQUEST:
        case CREATE_ALERT_REQUEST:
            return null;
        case UPDATE_ALERT_FAILURE:
        case DISMISS_ALERT_FAILURE:
        case CREATE_ALERT_FAILURE:
            return action.error;
        default:
            return state;
    }
}
