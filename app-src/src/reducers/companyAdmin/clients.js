import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAILURE,
    INVITE_CLIENT_REQUEST,
    INVITE_CLIENT_SUCCESS,
    INVITE_CLIENT_FAILURE,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAILURE,
    FETCH_CLIENTS_FOR_DRAWING_REQUEST,
    FETCH_CLIENTS_FOR_DRAWING_SUCCESS,
    FETCH_CLIENTS_FOR_DRAWING_FAILURE,
    EDIT_CLIENT_FOR_DRAWING_REQUEST,
    EDIT_CLIENT_FOR_DRAWING_SUCCESS,
    EDIT_CLIENT_FOR_DRAWING_FAILURE,
    DELETE_CLIENT_FROM_DRAWING_REQUEST,
    DELETE_CLIENT_FROM_DRAWING_SUCCESS,
    DELETE_CLIENT_FROM_DRAWING_FAILURE
} from 'constants/actionTypes/clients';

export default combineReducers({
    clients: clientsReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    deletionError: deletionErrorReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
        case FETCH_CLIENTS_FOR_DRAWING_REQUEST:
            return true;
        case FETCH_CLIENTS_SUCCESS:
        case FETCH_CLIENTS_FAILURE:
        case FETCH_CLIENTS_FOR_DRAWING_SUCCESS:
        case FETCH_CLIENTS_FOR_DRAWING_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADD_CLIENT_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_REQUEST:
            return true;
        case ADD_CLIENT_SUCCESS:
        case ADD_CLIENT_FAILURE:
        case EDIT_CLIENT_FOR_DRAWING_SUCCESS:
        case EDIT_CLIENT_FOR_DRAWING_FAILURE:
            return false;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_CLIENT_FROM_DRAWING_REQUEST:
            return null;
        case DELETE_CLIENT_FROM_DRAWING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_CLIENTS_FOR_DRAWING_REQUEST:
        case FETCH_CLIENTS_REQUEST:
        case INVITE_CLIENT_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_REQUEST:
        case DELETE_CLIENT_FROM_DRAWING_REQUEST:
            return null;
        case FETCH_CLIENTS_FAILURE:
        case INVITE_CLIENT_FAILURE:
        case FETCH_CLIENTS_FOR_DRAWING_FAILURE:
        case EDIT_CLIENT_FOR_DRAWING_FAILURE:
        case DELETE_CLIENT_FROM_DRAWING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_CLIENT_FAILURE:
        case ADD_CLIENT_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_FAILURE:
        case DELETE_CLIENT_FROM_DRAWING_REQUEST:
        case DELETE_CLIENT_FROM_DRAWING_FAILURE:
            return false;
        case ADD_CLIENT_SUCCESS:
        case EDIT_CLIENT_FOR_DRAWING_SUCCESS:
        case DELETE_CLIENT_FROM_DRAWING_SUCCESS:
            return true;
        default:
            return state;
    }
}

function clientsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CLIENTS_SUCCESS:
        case FETCH_CLIENTS_FOR_DRAWING_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case INVITE_CLIENT_SUCCESS:
        case EDIT_CLIENT_FOR_DRAWING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_CLIENT_FROM_DRAWING_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
