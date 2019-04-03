import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    DISMISS_MESSAGE_REQUEST,
    DISMISS_MESSAGE_SUCCESS,
    DISMISS_MESSAGE_FAILURE,
    DISMISS_MESSAGES_REQUEST,
    DISMISS_MESSAGES_SUCCESS,
    DISMISS_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';

export default combineReducers({
    messages: messagesReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return true;
        case FETCH_MESSAGES_SUCCESS:
        case FETCH_MESSAGES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case DISMISS_MESSAGE_REQUEST:
        case DISMISS_MESSAGES_REQUEST:
            return false;
        case DISMISS_MESSAGE_SUCCESS:
        case DISMISS_MESSAGES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
        case DISMISS_MESSAGE_REQUEST:
        case DISMISS_MESSAGES_REQUEST:
            return null;
        case FETCH_MESSAGES_FAILURE:
        case DISMISS_MESSAGE_FAILURE:
        case DISMISS_MESSAGES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function messagesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS:
            return convertArrToObj(action.payload);
        case DISMISS_MESSAGE_REQUEST:
            return {
                ...state,
                [action.id]: { ...state[action.id], isRead: true }
            };
        case DISMISS_MESSAGE_FAILURE:
            return {
                ...state,
                [action.id]: { ...state[action.id], isRead: false }
            };
        case DISMISS_MESSAGES_REQUEST: {
            const dismissed = Object.values(state).map(message =>
                message.type === action.messageType
                    ? {
                          ...message,
                          isRead: true
                      }
                    : message
            );
            return convertArrToObj(dismissed);
        }
        default:
            return state;
    }
}
