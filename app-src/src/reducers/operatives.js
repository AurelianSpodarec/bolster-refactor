import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_OPERATIVES_REQUEST,
    FETCH_OPERATIVES_SUCCESS,
    FETCH_OPERATIVES_FAILURE
} from 'constants/actionTypes/operatives';

export default combineReducers({
    operatives: operativesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_REQUEST:
            return true;
        case FETCH_OPERATIVES_SUCCESS:
        case FETCH_OPERATIVES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_REQUEST:
            return null;
        case FETCH_OPERATIVES_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function operativesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
