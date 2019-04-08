import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_HISTORIES_REQUEST,
    FETCH_PIN_HISTORIES_SUCCESS,
    FETCH_PIN_HISTORIES_FAILURE,
    FETCH_SINGLE_PIN_SUCCESS,
    SELECT_PIN_HISTORY
} from 'constants/actionTypes/pins';

export default combineReducers({
    histories: historiesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    selectedHistoryId: selectedHistoryReducer
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
            return action.error;
        default:
            return state;
    }
}

function historiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_HISTORIES_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_PIN_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload.histories) };
        default:
            return state;
    }
}

function selectedHistoryReducer(state = 0, action) {
    switch (action.type) {
        case SELECT_PIN_HISTORY:
            return action.id;
        default:
            return state;
    }
}
