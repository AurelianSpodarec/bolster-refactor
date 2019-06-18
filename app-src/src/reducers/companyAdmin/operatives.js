import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_OPERATIVES_REQUEST,
    FETCH_OPERATIVES_SUCCESS,
    FETCH_OPERATIVES_FAILURE,
    ADD_OPERATIVE_REQUEST,
    ADD_OPERATIVE_SUCCESS,
    ADD_OPERATIVE_FAILURE,
    EDIT_DRAWING_OPERATIVE_REQUEST,
    EDIT_DRAWING_OPERATIVE_SUCCESS,
    EDIT_DRAWING_OPERATIVE_FAILURE,
    DELETE_OPERATIVE_REQUEST,
    DELETE_OPERATIVE_SUCCESS,
    DELETE_OPERATIVE_FAILURE,
    ADD_OPERATIVES_REQUEST,
    ADD_OPERATIVES_FAILURE,
    ADD_OPERATIVES_SUCCESS
} from 'constants/actionTypes/operatives';

export default combineReducers({
    operatives: operativesReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    isDeleting: isDeletingReducer,
    deletionError: deletionErrorReducer,
    deleteSuccess: deleteSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_REQUEST:
            return true;
        case FETCH_OPERATIVES_SUCCESS:
        case FETCH_OPERATIVES_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADD_OPERATIVE_REQUEST:
        case ADD_OPERATIVES_REQUEST:
        case EDIT_DRAWING_OPERATIVE_REQUEST:
            return true;
        case EDIT_DRAWING_OPERATIVE_FAILURE:
        case EDIT_DRAWING_OPERATIVE_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_REQUEST:
        case ADD_OPERATIVE_REQUEST:
        case ADD_OPERATIVES_REQUEST:
        case EDIT_DRAWING_OPERATIVE_REQUEST:
            return null;
        case FETCH_OPERATIVES_FAILURE:
        case ADD_OPERATIVE_FAILURE:
        case EDIT_DRAWING_OPERATIVE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_OPERATIVE_REQUEST:
        case ADD_OPERATIVES_REQUEST:
        case ADD_OPERATIVE_FAILURE:
        case ADD_OPERATIVES_FAILURE:
        case EDIT_DRAWING_OPERATIVE_REQUEST:
        case EDIT_DRAWING_OPERATIVE_FAILURE:
            return false;
        case EDIT_DRAWING_OPERATIVE_SUCCESS:
        case ADD_OPERATIVE_SUCCESS:
        case ADD_OPERATIVES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_OPERATIVE_REQUEST:
            return true;
        case DELETE_OPERATIVE_SUCCESS:
        case DELETE_OPERATIVE_FAILURE:
            return false;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_OPERATIVE_REQUEST:
            return null;
        case DELETE_OPERATIVE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_OPERATIVE_REQUEST:
            return false;
        case DELETE_OPERATIVE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function operativesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_SUCCESS:
            return convertArrToObj(action.payload);
        case ADD_OPERATIVE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_OPERATIVE_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
