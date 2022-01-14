import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    DISMISS_COMPANY_ALERTS_REQUEST,
    DISMISS_COMPANY_ALERT_REQUEST,
    DISMISS_COMPANY_ALERT_SUCCESS,
    FETCH_SYSTEM_MESSAGES_FAILURE,
    FETCH_SYSTEM_MESSAGES_REQUEST,
    FETCH_SYSTEM_MESSAGES_SUCCESS,
    DISMISS_COMPANY_ALERTS_SUCCESS,
    DISMISS_COMPANY_ALERT_FAILURE,
    DISMISS_COMPANY_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';

export default combineReducers({
    systemMessages: systemMessagesReducer,
    // companyAlerts: companyAlertsReducer,
    // operativeAlerts: operativeAlertsReducer,
    // drawingExpiry: drawingExpiryReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
});

function systemMessagesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SYSTEM_MESSAGES_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_COMPANY_ALERT_SUCCESS:
            return {
                ...state,
                [action.id]: { ...state[action.id], isRead: true },
            };
        case DISMISS_COMPANY_ALERTS_SUCCESS: {
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

// function companyAlertsReducer(state = {}, action) {}

// function operativeAlertsReducer(state = {}, action) {}

// function drawingExpiryReducer(state = {}, action) {}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_SYSTEM_MESSAGES_REQUEST:
            return true;
        case FETCH_SYSTEM_MESSAGES_SUCCESS:
        case FETCH_SYSTEM_MESSAGES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case DISMISS_COMPANY_ALERT_REQUEST:
        case DISMISS_COMPANY_ALERTS_REQUEST:
        case DISMISS_COMPANY_ALERT_FAILURE:
        case DISMISS_COMPANY_ALERTS_FAILURE:
            return false;
        case DISMISS_COMPANY_ALERT_SUCCESS:
        case DISMISS_COMPANY_ALERTS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.ALERT) {
        case FETCH_SYSTEM_MESSAGES_REQUEST:
        case DISMISS_COMPANY_ALERT_REQUEST:
        case DISMISS_COMPANY_ALERTS_REQUEST:
            return null;
        case FETCH_SYSTEM_MESSAGES_FAILURE:
        case DISMISS_COMPANY_ALERT_FAILURE:
        case DISMISS_COMPANY_ALERTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
