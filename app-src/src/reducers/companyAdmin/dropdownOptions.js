import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_ALL_DROPDOWN_OPTIONS_REQUEST,
    FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_ALL_DROPDOWN_OPTIONS_FAILURE,
    CREATE_DROPDOWN_OPTION_REQUEST,
    CREATE_DROPDOWN_OPTION_SUCCESS,
    CREATE_DROPDOWN_OPTION_FAILURE,
    EDIT_DROPDOWN_OPTION_REQUEST,
    EDIT_DROPDOWN_OPTION_SUCCESS,
    EDIT_DROPDOWN_OPTION_FAILURE,
    DELETE_DROPDOWN_OPTION_REQUEST,
    DELETE_DROPDOWN_OPTION_SUCCESS,
    DELETE_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

import {
    FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST,
    FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE
} from 'constants/actionTypes/drawings';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DROPDOWN_OPTIONS_REQUEST:
        case FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST:
            return true;
        case FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS:
        case FETCH_ALL_DROPDOWN_OPTIONS_FAILURE:
        case FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS:
        case FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_DROPDOWN_OPTION_REQUEST:
        case EDIT_DROPDOWN_OPTION_REQUEST:
        case DELETE_DROPDOWN_OPTION_REQUEST:
            return false;
        case CREATE_DROPDOWN_OPTION_SUCCESS:
        case EDIT_DROPDOWN_OPTION_SUCCESS:
        case DELETE_DROPDOWN_OPTION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_DROPDOWN_OPTION_REQUEST:
        case EDIT_DROPDOWN_OPTION_REQUEST:
        case DELETE_DROPDOWN_OPTION_REQUEST:
            return null;
        case CREATE_DROPDOWN_OPTION_FAILURE:
        case EDIT_DROPDOWN_OPTION_FAILURE:
        case DELETE_DROPDOWN_OPTION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DROPDOWN_OPTIONS_REQUEST:
        case FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST:
            return null;
        case FETCH_ALL_DROPDOWN_OPTIONS_FAILURE:
        case FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function dropdownOptionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS:
            return {};
        case CREATE_DROPDOWN_OPTION_SUCCESS:
        case EDIT_DROPDOWN_OPTION_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_DROPDOWN_OPTION_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
