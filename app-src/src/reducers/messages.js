import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';

export default combineReducers({
    messages: messagesReducer,
    isFetching: isFetchingReducer,
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

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_MESSAGES_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function messagesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
