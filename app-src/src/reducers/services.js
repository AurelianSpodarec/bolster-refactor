import { combineReducers } from 'redux';
import {
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILURE,
    FETCH_ALL_SERVICES_REQUEST,
    FETCH_ALL_SERVICES_SUCCESS,
    FETCH_ALL_SERVICES_FAILURE
} from 'constants/actionTypes/services';
import { updateObj, convertArrToObj } from 'helpers/generic';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    updatedServiceID: updatedServiceIDReducer,
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_SERVICE_REQUEST:
            return false;
        case CREATE_SERVICE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_SERVICE_REQUEST:
        case FETCH_ALL_SERVICES_REQUEST:
            return null;
        case CREATE_SERVICE_FAILURE:
        case FETCH_ALL_SERVICES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function updatedServiceIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_SERVICE_REQUEST:
            return 0;
        case CREATE_SERVICE_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function servicesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SERVICES_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_SERVICE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
