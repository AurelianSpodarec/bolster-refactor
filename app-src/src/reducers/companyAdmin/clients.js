import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
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
    DELETE_CLIENT_FROM_DRAWING_FAILURE,
    FETCH_CLIENTS_FOR_FLOOR_SUCCESS,
    FETCH_CLIENTS_FOR_FLOOR_REQUEST,
    FETCH_CLIENTS_FOR_FLOOR_FAILURE,
    ADD_MANY_CLIENTS_REQUEST,
    ADD_MANY_CLIENTS_FAILURE,
    ADD_MANY_CLIENTS_SUCCESS,
    EDIT_CLIENT_REQUEST,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_FAILURE,
    DISABLE_CLIENT_USER_SUCCESS,
    DELETE_CLIENT_USER_SUCCESS,
    ADD_CLIENT_USER_REQUEST,
    ADD_CLIENT_USER_SUCCESS,
    ADD_CLIENT_USER_FAILURE,
    EDIT_CLIENT_EMAIL_REQUEST,
    EDIT_CLIENT_EMAIL_SUCCESS,
    EDIT_CLIENT_EMAIL_FAILURE,
} from 'constants/actionTypes/clients';

import {
    FETCH_CLIENT_USER_PERMISSIONS_REQUEST,
    FETCH_CLIENT_USER_PERMISSIONS_SUCCESS,
    FETCH_CLIENT_USER_PERMISSIONS_FAILURE,
    FETCH_CLIENT_USERS_SUCCESS,
    FETCH_CLIENT_USERS_REQUEST,
    FETCH_CLIENT_USERS_FAILURE,
    FETCH_CLIENT_USER_WITH_PERMISSIONS_REQUEST,
    FETCH_CLIENT_USER_WITH_PERMISSIONS_SUCCESS,
    FETCH_CLIENT_USER_WITH_PERMISSIONS_FAILURE,
} from 'constants/actionTypes/usersManagement';

export default combineReducers({
    clients: clientsReducer,
    clientUsers: clientUsersReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    deletionError: deletionErrorReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_CLIENTS_FOR_DRAWING_REQUEST:
        case FETCH_CLIENTS_FOR_FLOOR_REQUEST:
        case FETCH_CLIENT_USER_PERMISSIONS_REQUEST:
        case FETCH_CLIENT_USERS_REQUEST:
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_REQUEST:
            return true;
        case FETCH_CLIENTS_FOR_DRAWING_SUCCESS:
        case FETCH_CLIENTS_FOR_DRAWING_FAILURE:
        case FETCH_CLIENTS_FOR_FLOOR_SUCCESS:
        case FETCH_CLIENTS_FOR_FLOOR_FAILURE:
        case FETCH_CLIENT_USER_PERMISSIONS_SUCCESS:
        case FETCH_CLIENT_USER_PERMISSIONS_FAILURE:
        case FETCH_CLIENT_USERS_SUCCESS:
        case FETCH_CLIENT_USERS_FAILURE:
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_SUCCESS:
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADD_CLIENT_REQUEST:
        case ADD_CLIENT_USER_REQUEST:
        case ADD_MANY_CLIENTS_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_REQUEST:
        case EDIT_CLIENT_REQUEST:
        case EDIT_CLIENT_EMAIL_REQUEST:
            return true;
        case ADD_CLIENT_SUCCESS:
        case ADD_CLIENT_FAILURE:
        case ADD_CLIENT_USER_SUCCESS:
        case ADD_CLIENT_USER_FAILURE:
        case ADD_MANY_CLIENTS_SUCCESS:
        case ADD_MANY_CLIENTS_FAILURE:
        case EDIT_CLIENT_FOR_DRAWING_SUCCESS:
        case EDIT_CLIENT_FOR_DRAWING_FAILURE:
        case EDIT_CLIENT_SUCCESS:
        case EDIT_CLIENT_FAILURE:
        case EDIT_CLIENT_EMAIL_SUCCESS:
        case EDIT_CLIENT_EMAIL_FAILURE:
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
        case FETCH_CLIENTS_FOR_FLOOR_REQUEST:
        case INVITE_CLIENT_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_REQUEST:
        case DELETE_CLIENT_FROM_DRAWING_REQUEST:
        case FETCH_CLIENT_USER_PERMISSIONS_REQUEST:
        case FETCH_CLIENT_USERS_REQUEST:
        case EDIT_CLIENT_REQUEST:
        case EDIT_CLIENT_EMAIL_REQUEST:
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_REQUEST:
            return null;
        case INVITE_CLIENT_FAILURE:
        case FETCH_CLIENTS_FOR_DRAWING_FAILURE:
        case FETCH_CLIENTS_FOR_FLOOR_FAILURE:
        case EDIT_CLIENT_FOR_DRAWING_FAILURE:
        case DELETE_CLIENT_FROM_DRAWING_FAILURE:
        case FETCH_CLIENT_USER_PERMISSIONS_FAILURE:
        case FETCH_CLIENT_USERS_FAILURE:
        case EDIT_CLIENT_FAILURE:
        case EDIT_CLIENT_EMAIL_FAILURE:
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_CLIENT_FAILURE:
        case ADD_CLIENT_REQUEST:
        case ADD_CLIENT_USER_REQUEST:
        case ADD_MANY_CLIENTS_REQUEST:
        case ADD_MANY_CLIENTS_FAILURE:
        case EDIT_CLIENT_FOR_DRAWING_REQUEST:
        case EDIT_CLIENT_FOR_DRAWING_FAILURE:
        case DELETE_CLIENT_FROM_DRAWING_REQUEST:
        case DELETE_CLIENT_FROM_DRAWING_FAILURE:
        case EDIT_CLIENT_REQUEST:
        case EDIT_CLIENT_EMAIL_REQUEST:
            return false;
        case ADD_CLIENT_SUCCESS:
        case ADD_CLIENT_USER_SUCCESS:
        case ADD_MANY_CLIENTS_SUCCESS:
        case EDIT_CLIENT_FOR_DRAWING_SUCCESS:
        case DELETE_CLIENT_FROM_DRAWING_SUCCESS:
        case EDIT_CLIENT_SUCCESS:
        case EDIT_CLIENT_EMAIL_SUCCESS:
            return true;
        default:
            return state;
    }
}

function clientsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CLIENT_USER_PERMISSIONS_REQUEST:
        case FETCH_CLIENTS_FOR_DRAWING_REQUEST:
        case FETCH_CLIENTS_FOR_FLOOR_REQUEST:
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_REQUEST:
            return {};
        case FETCH_CLIENT_USER_PERMISSIONS_SUCCESS:
        case FETCH_CLIENTS_FOR_DRAWING_SUCCESS:
        case FETCH_CLIENTS_FOR_FLOOR_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_SUCCESS:
            return convertArrToObj(action.payload.permissions);
        case INVITE_CLIENT_SUCCESS:
        case EDIT_CLIENT_FOR_DRAWING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_CLIENT_FROM_DRAWING_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function clientUsersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CLIENT_USERS_REQUEST:
            return {};
        case FETCH_CLIENT_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_CLIENT_USER_WITH_PERMISSIONS_SUCCESS:
            return updateObj(state, action.payload.clientUser.id, action.payload.clientUser);
        case DISABLE_CLIENT_USER_SUCCESS:
        case EDIT_CLIENT_SUCCESS:
        case ADD_CLIENT_USER_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_CLIENT_USER_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
