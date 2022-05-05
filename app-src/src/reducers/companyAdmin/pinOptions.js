import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTIONS_REQUEST,
    FETCH_PIN_OPTIONS_SUCCESS,
    FETCH_PIN_OPTIONS_FAILURE,
    CREATE_PIN_OPTION_VALUE_REQUEST,
    CREATE_PIN_OPTION_VALUE_SUCCESS,
    CREATE_PIN_OPTION_VALUE_FAILURE,
    EDIT_PIN_OPTION_VALUE_REQUEST,
    EDIT_PIN_OPTION_VALUE_SUCCESS,
    EDIT_PIN_OPTION_VALUE_FAILURE,
    ENABLE_PIN_OPTION_VALUE_REQUEST,
    ENABLE_PIN_OPTION_VALUE_SUCCESS,
    ENABLE_PIN_OPTION_VALUE_FAILURE,
    DISABLE_PIN_OPTION_VALUE_REQUEST,
    DISABLE_PIN_OPTION_VALUE_SUCCESS,
    DISABLE_PIN_OPTION_VALUE_FAILURE,
    DELETE_PIN_OPTION_VALUE_REQUEST,
    DELETE_PIN_OPTION_VALUE_SUCCESS,
    DELETE_PIN_OPTION_VALUE_FAILURE,
    REORDER_PIN_OPTION_VALUES,
} from 'constants/actionTypes/pinOptions';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default combineReducers({
    options: optionsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTIONS_REQUEST:
            return true;
        case FETCH_PIN_OPTIONS_SUCCESS:
        case FETCH_PIN_OPTIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTIONS_REQUEST:
            return null;
        case FETCH_PIN_OPTIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
        case EDIT_PIN_OPTION_VALUE_REQUEST:
        case ENABLE_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_PIN_OPTION_VALUE_REQUEST:
        case DELETE_PIN_OPTION_VALUE_REQUEST:
            return true;
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case CREATE_PIN_OPTION_VALUE_FAILURE:
        case EDIT_PIN_OPTION_VALUE_SUCCESS:
        case EDIT_PIN_OPTION_VALUE_FAILURE:
        case ENABLE_PIN_OPTION_VALUE_SUCCESS:
        case ENABLE_PIN_OPTION_VALUE_FAILURE:
        case DISABLE_PIN_OPTION_VALUE_SUCCESS:
        case DISABLE_PIN_OPTION_VALUE_FAILURE:
        case DELETE_PIN_OPTION_VALUE_SUCCESS:
        case DELETE_PIN_OPTION_VALUE_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
        case EDIT_PIN_OPTION_VALUE_REQUEST:
        case ENABLE_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_PIN_OPTION_VALUE_REQUEST:
        case DELETE_PIN_OPTION_VALUE_REQUEST:
            return null;
        case CREATE_PIN_OPTION_VALUE_FAILURE:
        case EDIT_PIN_OPTION_VALUE_FAILURE:
        case ENABLE_PIN_OPTION_VALUE_FAILURE:
        case DISABLE_PIN_OPTION_VALUE_FAILURE:
        case DELETE_PIN_OPTION_VALUE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
        case EDIT_PIN_OPTION_VALUE_REQUEST:
        case ENABLE_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_PIN_OPTION_VALUE_REQUEST:
        case DELETE_PIN_OPTION_VALUE_REQUEST:
            return false;
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case EDIT_PIN_OPTION_VALUE_SUCCESS:
        case ENABLE_PIN_OPTION_VALUE_SUCCESS:
        case DISABLE_PIN_OPTION_VALUE_SUCCESS:
        case DELETE_PIN_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function optionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTIONS_SUCCESS:
        case REORDER_PIN_OPTION_VALUES:
            return convertArrToObj(action.payload);
        case ENABLE_PIN_OPTION_VALUE_SUCCESS:
        case DISABLE_PIN_OPTION_VALUE_SUCCESS:
        case ENABLE_PIN_OPTION_VALUE_FAILURE:
        case DISABLE_PIN_OPTION_VALUE_FAILURE:
            return updateObj(state, action.payload.id, action.payload);
        case ENABLE_PIN_OPTION_VALUE_REQUEST:
        case DISABLE_PIN_OPTION_VALUE_REQUEST:
            return updateObj(state, action.payload.id, {
                ...action.payload,
                isDisabled: !action.payload.isDisabled,
            });
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case EDIT_PIN_OPTION_VALUE_SUCCESS:
            return updateObj(state, action.payload.pinOption.id, action.payload.pinOption);
        case DELETE_PIN_OPTION_VALUE_SUCCESS:
            return updateObj(state, action.payload.id, {
                ...action.payload,
                isDeleted: true,
            });
        default:
            return state;
    }
}
