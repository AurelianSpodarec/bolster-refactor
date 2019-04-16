import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';

import {
    FETCH_INCOMING_TRANSFER_REQUESTS_REQUEST,
    FETCH_INCOMING_TRANSFER_REQUESTS_FAILURE,
    FETCH_INCOMING_TRANSFER_REQUESTS_SUCCESS,
    FETCH_OUTGOING_TRANSFER_REQUESTS_REQUEST,
    FETCH_OUTGOING_TRANSFER_REQUESTS_FAILURE,
    FETCH_OUTGOING_TRANSFER_REQUESTS_SUCCESS,
    DELETE_TRANSFER_REQUEST_REQUEST,
    DELETE_TRANSFER_REQUEST_FAILURE,
    DELETE_TRANSFER_REQUEST_SUCCESS
} from 'constants/actionTypes/transferRequests';

export default combineReducers({
    incomingTransferRequests: incomingTransferRequestsReducer,
    outgoingTransferRequests: outgoingTransferRequestsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_INCOMING_TRANSFER_REQUESTS_REQUEST:
        case FETCH_OUTGOING_TRANSFER_REQUESTS_REQUEST:
            return true;
        case FETCH_INCOMING_TRANSFER_REQUESTS_SUCCESS:
        case FETCH_OUTGOING_TRANSFER_REQUESTS_SUCCESS:
        case FETCH_INCOMING_TRANSFER_REQUESTS_FAILURE:
        case FETCH_OUTGOING_TRANSFER_REQUESTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_INCOMING_TRANSFER_REQUESTS_REQUEST:
        case FETCH_OUTGOING_TRANSFER_REQUESTS_REQUEST:
        case DELETE_TRANSFER_REQUEST_REQUEST:
            return null;
        case FETCH_INCOMING_TRANSFER_REQUESTS_FAILURE:
        case FETCH_OUTGOING_TRANSFER_REQUESTS_FAILURE:
        case DELETE_TRANSFER_REQUEST_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function incomingTransferRequestsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_INCOMING_TRANSFER_REQUESTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_TRANSFER_REQUEST_REQUEST:
            return false;
        case DELETE_TRANSFER_REQUEST_SUCCESS:
            return true;
        default:
            return state;
    }
}

function outgoingTransferRequestsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OUTGOING_TRANSFER_REQUESTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
