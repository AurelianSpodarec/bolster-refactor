import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_OPERATIVES_REQUEST,
    FETCH_OPERATIVES_SUCCESS,
    FETCH_OPERATIVES_FAILURE,
    ADD_OPERATIVE_REQUEST,
    ADD_OPERATIVE_SUCCESS,
    ADD_OPERATIVE_FAILURE,
    EDIT_DRAWING_OPERATIVE_REQUEST,
    EDIT_DRAWING_OPERATIVE_SUCCESS,
    EDIT_DRAWING_OPERATIVE_FAILURE
} from 'constants/actionTypes/operatives';

export default combineReducers({
    operatives: operativesReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
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
            return true;
        case ADD_OPERATIVE_FAILURE:
        case ADD_OPERATIVE_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_OPERATIVES_REQUEST:
        case ADD_OPERATIVE_REQUEST:
            return null;
        case FETCH_OPERATIVES_FAILURE:
        case ADD_OPERATIVE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_OPERATIVE_REQUEST:
        case ADD_OPERATIVE_FAILURE:
            return false;
        case ADD_OPERATIVE_SUCCESS:
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
        default:
            return state;
    }
}
