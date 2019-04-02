import { combineReducers } from 'redux';
import {
    FETCH_ALL_SERVICES_REQUEST,
    FETCH_ALL_SERVICES_SUCCESS,
    FETCH_ALL_SERVICES_FAILURE
} from 'constants/actionTypes/services';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    services: servicesReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_SERVICES_REQUEST:
            return true;
        case FETCH_ALL_SERVICES_SUCCESS:
        case FETCH_ALL_SERVICES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_SERVICES_REQUEST:
            return null;

        case FETCH_ALL_SERVICES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function servicesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SERVICES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
