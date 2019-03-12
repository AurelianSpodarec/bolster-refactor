import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_HISTORIES_REQUEST,
    FETCH_PIN_HISTORIES_SUCCESS,
    FETCH_PIN_HISTORIES_FAILURE
} from 'constants/actionTypes/pins';

export default combineReducers({
    pinHistories: pinHistoriesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_HISTORIES_REQUEST:
            return true;
        case FETCH_PIN_HISTORIES_SUCCESS:
        case FETCH_PIN_HISTORIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_HISTORIES_REQUEST:
            return null;
        case FETCH_PIN_HISTORIES_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function pinHistoriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_HISTORIES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
