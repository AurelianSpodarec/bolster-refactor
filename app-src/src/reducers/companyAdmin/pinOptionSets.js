import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_SETS_REQUEST,
    FETCH_PIN_OPTION_SETS_SUCCESS,
    FETCH_PIN_OPTION_SETS_FAILURE,
    CREATE_PIN_OPTION_SET_REQUEST,
    CREATE_PIN_OPTION_SET_SUCCESS,
    CREATE_PIN_OPTION_SET_FAILURE,
    EDIT_PIN_OPTION_SET_REQUEST,
    EDIT_PIN_OPTION_SET_SUCCESS,
    EDIT_PIN_OPTION_SET_FAILURE,
    ENABLE_PIN_OPTION_SET_REQUEST,
    ENABLE_PIN_OPTION_SET_SUCCESS,
    ENABLE_PIN_OPTION_SET_FAILURE,
    DISABLE_PIN_OPTION_SET_REQUEST,
    DISABLE_PIN_OPTION_SET_SUCCESS,
    DISABLE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export default combineReducers({
    sets: setsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_SETS_REQUEST:
            return true;
        case FETCH_PIN_OPTION_SETS_SUCCESS:
        case FETCH_PIN_OPTION_SETS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_SETS_REQUEST:
            return null;
        case FETCH_PIN_OPTION_SETS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_SET_REQUEST:
        case EDIT_PIN_OPTION_SET_REQUEST:
        case ENABLE_PIN_OPTION_SET_REQUEST:
        case DISABLE_PIN_OPTION_SET_REQUEST:
            return true;
        case CREATE_PIN_OPTION_SET_SUCCESS:
        case CREATE_PIN_OPTION_SET_FAILURE:
        case EDIT_PIN_OPTION_SET_SUCCESS:
        case EDIT_PIN_OPTION_SET_FAILURE:
        case ENABLE_PIN_OPTION_SET_SUCCESS:
        case ENABLE_PIN_OPTION_SET_FAILURE:
        case DISABLE_PIN_OPTION_SET_SUCCESS:
        case DISABLE_PIN_OPTION_SET_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_SET_REQUEST:
        case EDIT_PIN_OPTION_SET_REQUEST:
        case ENABLE_PIN_OPTION_SET_REQUEST:
        case DISABLE_PIN_OPTION_SET_REQUEST:
            return null;
        case CREATE_PIN_OPTION_SET_FAILURE:
        case EDIT_PIN_OPTION_SET_FAILURE:
        case ENABLE_PIN_OPTION_SET_FAILURE:
        case DISABLE_PIN_OPTION_SET_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_SET_REQUEST:
        case EDIT_PIN_OPTION_SET_REQUEST:
        case ENABLE_PIN_OPTION_SET_REQUEST:
        case DISABLE_PIN_OPTION_SET_REQUEST:
            return false;
        case CREATE_PIN_OPTION_SET_SUCCESS:
        case EDIT_PIN_OPTION_SET_SUCCESS:
        case ENABLE_PIN_OPTION_SET_SUCCESS:
        case DISABLE_PIN_OPTION_SET_SUCCESS:
            return true;
        default:
            return state;
    }
}

function setsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_SETS_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_PIN_OPTION_SET_SUCCESS:
        case EDIT_PIN_OPTION_SET_SUCCESS:
        case ENABLE_PIN_OPTION_SET_SUCCESS:
        case DISABLE_PIN_OPTION_SET_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
