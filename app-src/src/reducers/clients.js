import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAILURE
} from 'constants/actionTypes/clients';

export default combineReducers({
    clients: clientsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
            return true;
        case FETCH_CLIENTS_SUCCESS:
        case FETCH_CLIENTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
            return null;
        case FETCH_CLIENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function clientsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CLIENTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
