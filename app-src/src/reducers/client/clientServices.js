import { combineReducers } from 'redux';
import {
    CLIENT_FETCH_ALL_SERVICES_REQUEST,
    CLIENT_FETCH_ALL_SERVICES_SUCCESS,
    CLIENT_FETCH_ALL_SERVICES_FAILURE,
    CLIENT_FETCH_HISTORIC_SERVICES_REQUEST,
    CLIENT_FETCH_HISTORIC_SERVICES_SUCCESS,
    CLIENT_FETCH_HISTORIC_SERVICES_FAILURE
} from 'constants/client/actionTypes/clientServices';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    services: servicesReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_SERVICES_REQUEST:
        case CLIENT_FETCH_HISTORIC_SERVICES_REQUEST:
            return true;
        case CLIENT_FETCH_ALL_SERVICES_SUCCESS:
        case CLIENT_FETCH_ALL_SERVICES_FAILURE:
        case CLIENT_FETCH_HISTORIC_SERVICES_SUCCESS:
        case CLIENT_FETCH_HISTORIC_SERVICES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_SERVICES_REQUEST:
        case CLIENT_FETCH_HISTORIC_SERVICES_REQUEST:
            return null;

        case CLIENT_FETCH_ALL_SERVICES_FAILURE:
        case CLIENT_FETCH_HISTORIC_SERVICES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function servicesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_SERVICES_SUCCESS:
        case CLIENT_FETCH_HISTORIC_SERVICES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
