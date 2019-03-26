import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';

import {
    FETCH_ALL_ENQUIRIES_REQUEST,
    FETCH_ALL_ENQUIRIES_SUCCESS,
    FETCH_ALL_ENQUIRIES_FAILURE
} from 'constants/actionTypes/enquiries';

export default combineReducers({
    enquiries: enquiriesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_ENQUIRIES_REQUEST:
            return true;
        case FETCH_ALL_ENQUIRIES_SUCCESS:
        case FETCH_ALL_ENQUIRIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_ENQUIRIES_REQUEST:
            return null;
        case FETCH_ALL_ENQUIRIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function enquiriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_ENQUIRIES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
