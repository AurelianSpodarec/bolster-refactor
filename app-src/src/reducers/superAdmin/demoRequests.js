import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';

import {
    FETCH_ALL_DEMO_REQUESTS_REQUEST,
    FETCH_ALL_DEMO_REQUESTS_SUCCESS,
    FETCH_ALL_DEMO_REQUESTS_FAILURE,
    DELETE_DEMO_REQUEST_REQUEST,
    DELETE_DEMO_REQUEST_SUCCESS,
    DELETE_DEMO_REQUEST_FAILURE
} from 'constants/actionTypes/demoRequests';

export default combineReducers({
    demoRequests: demoRequestsReducer,
    isFetching: isFetchingReducer,
    isDeleting: isDeletingReducer,
    deletionError: deletionErrorReducer,
    fetchingError: fetchingErrorReducer,
    deleteSuccess: deleteSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DEMO_REQUESTS_REQUEST:
            return true;
        case FETCH_ALL_DEMO_REQUESTS_SUCCESS:
        case FETCH_ALL_DEMO_REQUESTS_FAILURE:
            return false;
        default:
            return state;
    }
}
function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_DEMO_REQUEST_REQUEST:
            return true;
        case DELETE_DEMO_REQUEST_SUCCESS:
        case DELETE_DEMO_REQUEST_FAILURE:
            return false;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_DEMO_REQUEST_REQUEST:
            return false;
        case DELETE_DEMO_REQUEST_SUCCESS:
            return true;
        default:
            return state;
    }
}

function fetchingErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DEMO_REQUESTS_REQUEST:
            return null;
        case FETCH_ALL_DEMO_REQUESTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_DEMO_REQUEST_REQUEST:
            return null;
        case DELETE_DEMO_REQUEST_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function demoRequestsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DEMO_REQUESTS_SUCCESS:
            return convertArrToObj(action.payload);

        case DELETE_DEMO_REQUEST_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
