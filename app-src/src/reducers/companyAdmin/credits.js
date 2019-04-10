import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_CREDITS_REQUEST,
    FETCH_CREDITS_SUCCESS,
    FETCH_CREDITS_FAILURE
} from 'constants/actionTypes/creditLogs';

export default combineReducers({
    credits: creditsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_CREDITS_REQUEST:
            return true;
        case FETCH_CREDITS_SUCCESS:
        case FETCH_CREDITS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_CREDITS_REQUEST:
            return null;
        case FETCH_CREDITS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function creditsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CREDITS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
