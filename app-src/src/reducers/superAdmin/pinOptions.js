import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_ADMIN_PIN_OPTIONS_REQUEST,
    FETCH_ADMIN_PIN_OPTIONS_SUCCESS,
    FETCH_ADMIN_PIN_OPTIONS_FAILURE,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_FAILURE,
    FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_REQUEST,
    DELETE_ADMIN_PIN_OPTION_SUCCESS,
    DELETE_ADMIN_PIN_OPTION_FAILURE,
} from 'constants/actionTypes/pinOptions';

export default combineReducers({
    options: optionsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isDeleting: isDeletingReducer,
    deleteError: deleteErrorReducer,
    deleteSuccess: deleteSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_REQUEST:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_REQUEST:
            return true;
        case FETCH_ADMIN_PIN_OPTIONS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FAILURE:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_REQUEST:
            return null;
        case FETCH_ADMIN_PIN_OPTIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function optionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ADMIN_PIN_OPTIONS_SUCCESS:
        case FETCH_ADMIN_PIN_OPTIONS_FOR_COMPANY_SUCCESS:
            return convertArrToObj(action.payload);
        case DELETE_ADMIN_PIN_OPTION_SUCCESS:
            return removeObjItem(state, action.payload);
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_ADMIN_PIN_OPTION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function deleteErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_ADMIN_PIN_OPTION_SUCCESS:
            return null;
        case DELETE_ADMIN_PIN_OPTION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = null, action) {
    switch (action.type) {
        case DELETE_ADMIN_PIN_OPTION_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
