import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_DRAWINGS_REQUEST,
    FETCH_ALL_DRAWINGS_SUCCESS,
    FETCH_ALL_DRAWINGS_FAILURE
} from 'constants/actionTypes/drawings';

export default combineReducers({
    drawings: drawingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_REQUEST:
            return true;
        case FETCH_ALL_DRAWINGS_SUCCESS:
        case FETCH_ALL_DRAWINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_REQUEST:
            return null;
        case FETCH_ALL_DRAWINGS_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
