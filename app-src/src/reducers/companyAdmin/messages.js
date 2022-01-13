import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_BASIC_REQUEST,
    FETCH_MESSAGES_BASIC_SUCCESS,
    FETCH_MESSAGES_BASIC_FAILURE,
    DISMISS_ALERT_REQUEST,
    DISMISS_ALERT_SUCCESS,
    DISMISS_ALERT_FAILURE,
    DISMISS_ALERTS_REQUEST,
    DISMISS_ALERTS_SUCCESS,
    DISMISS_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export default combineReducers({
    alerts: messageCentreReducer,
    messages: messageCentreReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
        case FETCH_MESSAGES_BASIC_REQUEST:
            return true;
        case FETCH_MESSAGES_SUCCESS:
        case FETCH_MESSAGES_FAILURE:
        case FETCH_MESSAGES_BASIC_SUCCESS:
        case FETCH_MESSAGES_BASIC_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case DISMISS_ALERT_REQUEST:
        case DISMISS_ALERTS_REQUEST:
            return false;
        case DISMISS_ALERT_SUCCESS:
        case DISMISS_ALERTS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.ALERT) {
        case FETCH_MESSAGES_REQUEST:
        case FETCH_MESSAGES_BASIC_REQUEST:
        case DISMISS_ALERT_REQUEST:
        case DISMISS_ALERTS_REQUEST:
            return null;
        case FETCH_MESSAGES_FAILURE:
        case FETCH_MESSAGES_BASIC_FAILURE:
        case DISMISS_ALERT_FAILURE:
        case DISMISS_ALERTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function messageCentreReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS:
        case FETCH_MESSAGES_BASIC_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_ALERT_REQUEST:
            return {
                ...state,
                [action.id]: { ...state[action.id], isRead: true },
            };
        case DISMISS_ALERT_FAILURE:
            return {
                ...state,
                [action.id]: { ...state[action.id], isRead: false },
            };
        case DISMISS_ALERTS_REQUEST: {
            const dismissed = Object.values(state).map(alert =>
                alert.type === action.alertType
                    ? {
                          ...alert,
                          isRead: true,
                      }
                    : alert,
            );
            return convertArrToObj(dismissed);
        }
        default:
            return state;
    }
}
