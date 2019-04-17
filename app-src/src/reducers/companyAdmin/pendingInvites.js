import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PENDING_INVITES_REQUEST,
    FETCH_OUTGOING_INVITES_REQUEST,
    FETCH_PENDING_INVITES_FAILURE,
    FETCH_PENDING_INVITES_SUCCESS,
    FETCH_OUTGOING_INVITES_FAILURE,
    FETCH_OUTGOING_INVITES_SUCCESS,
    ACCEPT_PENDING_INVITE_REQUEST,
    ACCEPT_PENDING_INVITE_FAILURE,
    ACCEPT_PENDING_INVITE_SUCCESS
} from 'constants/actionTypes/pendingInvites';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    pendingInvites: pendingInvitesReducer,
    outgoingInvites: outgoingInvitesReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PENDING_INVITES_REQUEST:
        case FETCH_OUTGOING_INVITES_REQUEST:
            return true;
        case FETCH_PENDING_INVITES_FAILURE:
        case FETCH_OUTGOING_INVITES_FAILURE:
        case FETCH_PENDING_INVITES_SUCCESS:
        case FETCH_OUTGOING_INVITES_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PENDING_INVITES_REQUEST:
        case FETCH_OUTGOING_INVITES_REQUEST:
        case ACCEPT_PENDING_INVITE_REQUEST:
            return null;
        case FETCH_PENDING_INVITES_FAILURE:
        case FETCH_OUTGOING_INVITES_FAILURE:
        case ACCEPT_PENDING_INVITE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ACCEPT_PENDING_INVITE_REQUEST:
            return false;
        case ACCEPT_PENDING_INVITE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function pendingInvitesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PENDING_INVITES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function outgoingInvitesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OUTGOING_INVITES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
