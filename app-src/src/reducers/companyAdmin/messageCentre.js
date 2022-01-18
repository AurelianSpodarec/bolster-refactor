import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';
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
    FETCH_COMPANY_ALERTS_SUCCESS,
    DISMISS_SYSTEM_MESSAGES_SUCCESS,
    FETCH_COMPANY_ALERTS_REQUEST,
    FETCH_COMPANY_ALERTS_FAILURE,
    FETCH_OPERATIVE_ALERTS_REQUEST,
    FETCH_OPERATIVE_ALERTS_SUCCESS,
    FETCH_OPERATIVE_ALERTS_FAILURE,
    FETCH_DRAWING_EXPIRY_MESSAGES_SUCCESS,
    FETCH_DRAWING_EXPIRY_MESSAGES_REQUEST,
    FETCH_DRAWING_EXPIRY_MESSAGES_FAILURE,
    DISMISS_OPERATIVE_ALERT_SUCCESS,
    DISMISS_OPERATIVE_ALERT_REQUEST,
    DISMISS_OPERATIVE_ALERTS_REQUEST,
    DISMISS_OPERATIVE_ALERT_FAILURE,
    DISMISS_OPERATIVE_ALERTS_FAILURE,
    DISMISS_OPERATIVE_ALERTS_SUCCESS,
    DISMISS_SYSTEM_MESSAGE_REQUEST,
    DISMISS_SYSTEM_MESSAGES_REQUEST,
    DISMISS_SYSTEM_MESSAGE_FAILURE,
    DISMISS_SYSTEM_MESSAGES_FAILURE,
    DISMISS_SYSTEM_MESSAGE_SUCCESS,
    DISMISS_DRAWING_EXPIRY_MESSAGES_SUCCESS,
    DISMISS_DRAWING_EXPIRY_MESSAGES_REQUEST,
    DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST,
    DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE,
    DISMISS_DRAWING_EXPIRY_MESSAGES_FAILURE,
    DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS,
    SELECT_MESSAGE_CENTRE_TAB,
    POST_MARK_SYSTEM_MESSAGES_AS_READ_SUCCESS,
    POST_MARK_COMPANY_ALERTS_AS_READ_SUCCESS,
    POST_MARK_DRAWING_EXPIRY_MESSAGES_AS_READ_SUCCESS,
} from 'constants/actionTypes/messageCentre';

export default combineReducers({
    systemMessages: systemMessagesReducer,
    companyAlerts: companyAlertsReducer,
    operativeAlerts: operativeAlertsReducer,
    drawingExpiry: drawingExpiryReducer,
    isFetchingSystemMessages: isFetchingSystemMessagesReducer,
    isFetchingCompanyAlerts: isFetchingCompanyAlertsReducer,
    isFetchingOperativeAlerts: isFetchingOperativeAlertsReducer,
    isFetchingDrawingExpiryMessages: isFetchingDrawingExpiryMessagesReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
    selectedTab: selectedTabReducer,
});

function systemMessagesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SYSTEM_MESSAGES_SUCCESS:
        case POST_MARK_SYSTEM_MESSAGES_AS_READ_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_SYSTEM_MESSAGES_SUCCESS:
            return {};
        case DISMISS_SYSTEM_MESSAGE_SUCCESS:
            return removeObjItem(state, action.payload);
        default:
            return state;
    }
}

function companyAlertsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_ALERTS_SUCCESS:
        case POST_MARK_COMPANY_ALERTS_AS_READ_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_COMPANY_ALERT_SUCCESS:
            return removeObjItem(state, action.payload);
        case DISMISS_COMPANY_ALERTS_SUCCESS:
            return {};
        default:
            return state;
    }
}

function operativeAlertsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OPERATIVE_ALERTS_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_OPERATIVE_ALERT_SUCCESS:
            return removeObjItem(state, action.payload);
        case DISMISS_OPERATIVE_ALERTS_SUCCESS:
            return {};
        default:
            return state;
    }
}

function drawingExpiryReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DRAWING_EXPIRY_MESSAGES_SUCCESS:
        case POST_MARK_DRAWING_EXPIRY_MESSAGES_AS_READ_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS:
            return removeObjItem(state, action.payload);
        case DISMISS_DRAWING_EXPIRY_MESSAGES_SUCCESS:
            return {};
        default:
            return state;
    }
}

function isFetchingSystemMessagesReducer(state = false, action) {
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

function isFetchingCompanyAlertsReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_ALERTS_REQUEST:
            return true;
        case FETCH_COMPANY_ALERTS_SUCCESS:
        case FETCH_COMPANY_ALERTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isFetchingOperativeAlertsReducer(state = false, action) {
    switch (action.type) {
        case FETCH_OPERATIVE_ALERTS_REQUEST:
            return true;
        case FETCH_OPERATIVE_ALERTS_SUCCESS:
        case FETCH_OPERATIVE_ALERTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isFetchingDrawingExpiryMessagesReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_EXPIRY_MESSAGES_REQUEST:
            return true;
        case FETCH_DRAWING_EXPIRY_MESSAGES_SUCCESS:
        case FETCH_DRAWING_EXPIRY_MESSAGES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case DISMISS_SYSTEM_MESSAGE_REQUEST:
        case DISMISS_SYSTEM_MESSAGES_REQUEST:
        case DISMISS_COMPANY_ALERT_REQUEST:
        case DISMISS_COMPANY_ALERTS_REQUEST:
        case DISMISS_OPERATIVE_ALERT_REQUEST:
        case DISMISS_OPERATIVE_ALERTS_REQUEST:
        case DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST:
        case DISMISS_DRAWING_EXPIRY_MESSAGES_REQUEST:
        case DISMISS_SYSTEM_MESSAGE_FAILURE:
        case DISMISS_SYSTEM_MESSAGES_FAILURE:
        case DISMISS_COMPANY_ALERT_FAILURE:
        case DISMISS_COMPANY_ALERTS_FAILURE:
        case DISMISS_OPERATIVE_ALERT_FAILURE:
        case DISMISS_OPERATIVE_ALERTS_FAILURE:
        case DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE:
        case DISMISS_DRAWING_EXPIRY_MESSAGES_FAILURE:
            return false;
        case DISMISS_COMPANY_ALERT_SUCCESS:
        case DISMISS_COMPANY_ALERTS_SUCCESS:
        case DISMISS_OPERATIVE_ALERT_SUCCESS:
        case DISMISS_OPERATIVE_ALERTS_SUCCESS:
        case DISMISS_SYSTEM_MESSAGE_SUCCESS:
        case DISMISS_SYSTEM_MESSAGES_SUCCESS:
        case DISMISS_DRAWING_EXPIRY_MESSAGE_SUCCESS:
        case DISMISS_DRAWING_EXPIRY_MESSAGES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.ALERT) {
        case FETCH_SYSTEM_MESSAGES_REQUEST:
        case FETCH_COMPANY_ALERTS_REQUEST:
        case FETCH_OPERATIVE_ALERTS_REQUEST:
        case FETCH_DRAWING_EXPIRY_MESSAGES_REQUEST:
        case DISMISS_SYSTEM_MESSAGE_REQUEST:
        case DISMISS_SYSTEM_MESSAGES_REQUEST:
        case DISMISS_COMPANY_ALERT_REQUEST:
        case DISMISS_COMPANY_ALERTS_REQUEST:
        case DISMISS_OPERATIVE_ALERT_REQUEST:
        case DISMISS_OPERATIVE_ALERTS_REQUEST:
        case DISMISS_DRAWING_EXPIRY_MESSAGE_REQUEST:
        case DISMISS_DRAWING_EXPIRY_MESSAGES_REQUEST:
            return null;
        case FETCH_SYSTEM_MESSAGES_FAILURE:
        case FETCH_COMPANY_ALERTS_FAILURE:
        case FETCH_OPERATIVE_ALERTS_FAILURE:
        case FETCH_DRAWING_EXPIRY_MESSAGES_FAILURE:
        case DISMISS_SYSTEM_MESSAGE_FAILURE:
        case DISMISS_SYSTEM_MESSAGES_FAILURE:
        case DISMISS_COMPANY_ALERT_FAILURE:
        case DISMISS_COMPANY_ALERTS_FAILURE:
        case DISMISS_OPERATIVE_ALERT_FAILURE:
        case DISMISS_OPERATIVE_ALERTS_FAILURE:
        case DISMISS_DRAWING_EXPIRY_MESSAGE_FAILURE:
        case DISMISS_DRAWING_EXPIRY_MESSAGES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function selectedTabReducer(state = 0, action) {
    switch (action.type) {
        case SELECT_MESSAGE_CENTRE_TAB:
            return action.payload;
        default:
            return state;
    }
}
