import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import {
    FETCH_ADMIN_PIN_OPTION_SETS_REQUEST,
    FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS,
    FETCH_ADMIN_PIN_OPTION_SETS_FAILURE,
    CREATE_ADMIN_PIN_OPTION_SET_REQUEST,
    CREATE_ADMIN_PIN_OPTION_SET_FAILURE,
    CREATE_ADMIN_PIN_OPTION_SET_SUCCESS,
    EDIT_ADMIN_PIN_OPTION_SET_SUCCESS,
    EDIT_ADMIN_PIN_OPTION_SET_REQUEST,
    EDIT_ADMIN_PIN_OPTION_SET_FAILURE,
    DELETE_ADMIN_PIN_OPTION_SET_REQUEST,
    DELETE_ADMIN_PIN_OPTION_SET_SUCCESS,
    DELETE_ADMIN_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';
import { SET_API_FIELD_ERRORS } from '../../constants/actionTypes/generic';

export default combineReducers({
    sets: setsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
    isDeleting: isDeletingReducer,
    deleteSuccess: deleteSuccessReducer,
    deleteError: deleteErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_SETS_REQUEST:
            return true;
        case FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTION_SETS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_SETS_REQUEST:
            return null;
        case FETCH_ADMIN_PIN_OPTION_SETS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function setsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_ADMIN_PIN_OPTION_SET_SUCCESS:
        case EDIT_ADMIN_PIN_OPTION_SET_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_ADMIN_PIN_OPTION_SET_SUCCESS:
            return removeObjItem(state, action.payload);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_ADMIN_PIN_OPTION_SET_REQUEST:
        case EDIT_ADMIN_PIN_OPTION_SET_REQUEST:
            return true;
        case CREATE_ADMIN_PIN_OPTION_SET_SUCCESS:
        case CREATE_ADMIN_PIN_OPTION_SET_FAILURE:
        case EDIT_ADMIN_PIN_OPTION_SET_SUCCESS:
        case EDIT_ADMIN_PIN_OPTION_SET_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_ADMIN_PIN_OPTION_SET_REQUEST:
        case EDIT_ADMIN_PIN_OPTION_SET_REQUEST:
            return null;
        case CREATE_ADMIN_PIN_OPTION_SET_FAILURE:
        case EDIT_ADMIN_PIN_OPTION_SET_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_ADMIN_PIN_OPTION_SET_REQUEST:
        case EDIT_ADMIN_PIN_OPTION_SET_REQUEST:
            return false;
        case CREATE_ADMIN_PIN_OPTION_SET_SUCCESS:
        case EDIT_ADMIN_PIN_OPTION_SET_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_ADMIN_PIN_OPTION_SET_REQUEST:
            return true;
        case DELETE_ADMIN_PIN_OPTION_SET_SUCCESS:
        case DELETE_ADMIN_PIN_OPTION_SET_FAILURE:
            return false;
        default:
            return state;
    }
}
function deleteErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_ADMIN_PIN_OPTION_SET_REQUEST:
            return null;
        case DELETE_ADMIN_PIN_OPTION_SET_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_ADMIN_PIN_OPTION_SET_REQUEST:
            return false;
        case DELETE_ADMIN_PIN_OPTION_SET_SUCCESS:
            return true;
        default:
            return state;
    }
}
