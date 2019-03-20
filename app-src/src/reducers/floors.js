import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_FLOORS_REQUEST,
    FETCH_ALL_FLOORS_SUCCESS,
    FETCH_ALL_FLOORS_FAILURE
} from 'constants/actionTypes/floors';

export default combineReducers({
    floors: floorsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_FLOORS_REQUEST:
            return true;
        case FETCH_ALL_FLOORS_SUCCESS:
        case FETCH_ALL_FLOORS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_FLOORS_REQUEST:
            return null;
        case FETCH_ALL_FLOORS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function floorsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_FLOORS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
