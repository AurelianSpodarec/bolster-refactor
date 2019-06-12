import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_MESSAGES_REQUEST,
    CLIENT_FETCH_MESSAGES_SUCCESS,
    CLIENT_FETCH_MESSAGES_FAILURE,
    CLIENT_DISMISS_MESSAGES_REQUEST,
    CLIENT_DISMISS_MESSAGES_SUCCESS,
    CLIENT_DISMISS_MESSAGES_FAILURE
} from 'constants/client/actionTypes/clientMessages';

export default combineReducers({
    messages: messagesReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_MESSAGES_REQUEST:
            return true;
        case CLIENT_FETCH_MESSAGES_SUCCESS:
        case CLIENT_FETCH_MESSAGES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_DISMISS_MESSAGES_REQUEST:
            return false;
        case CLIENT_DISMISS_MESSAGES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_MESSAGES_REQUEST:
        case CLIENT_DISMISS_MESSAGES_REQUEST:
            return null;
        case CLIENT_FETCH_MESSAGES_FAILURE:
        case CLIENT_DISMISS_MESSAGES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function messagesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_MESSAGES_SUCCESS:
            return convertArrToObj(action.payload);
        case CLIENT_DISMISS_MESSAGES_REQUEST: {
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
