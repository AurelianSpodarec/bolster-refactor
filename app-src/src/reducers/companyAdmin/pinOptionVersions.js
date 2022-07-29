import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, updateObjMultiple } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_VERSIONS_REQUEST,
    FETCH_PIN_OPTION_VERSIONS_SUCCESS,
    FETCH_PIN_OPTION_VERSIONS_FAILURE,
    FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_REQUEST,
    FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_SUCCESS,
    FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_FAILURE,
    CREATE_PIN_OPTION_VALUE_REQUEST,
    CREATE_PIN_OPTION_VALUE_SUCCESS,
    CREATE_PIN_OPTION_VALUE_FAILURE,
    EDIT_PIN_OPTION_VALUE_REQUEST,
    EDIT_PIN_OPTION_VALUE_SUCCESS,
    EDIT_PIN_OPTION_VALUE_FAILURE,
    DUPLICATE_PIN_OPTION_VALUE_REQUEST,
    DUPLICATE_PIN_OPTION_VALUE_SUCCESS,
    DUPLICATE_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';
import { SET_API_FIELD_ERRORS } from 'constants/actionTypes/generic';

export default combineReducers({
    versions: versionsReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_VERSIONS_REQUEST:
        case FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_REQUEST:
            return true;
        case FETCH_PIN_OPTION_VERSIONS_SUCCESS:
        case FETCH_PIN_OPTION_VERSIONS_FAILURE:
        case FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_SUCCESS:
        case FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_VERSIONS_REQUEST:
        case FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_REQUEST:
            return null;
        case FETCH_PIN_OPTION_VERSIONS_FAILURE:
        case FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
        case EDIT_PIN_OPTION_VALUE_REQUEST:
        case DUPLICATE_PIN_OPTION_VALUE_REQUEST:
            return true;
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case CREATE_PIN_OPTION_VALUE_FAILURE:
        case EDIT_PIN_OPTION_VALUE_SUCCESS:
        case EDIT_PIN_OPTION_VALUE_FAILURE:
        case DUPLICATE_PIN_OPTION_VALUE_SUCCESS:
        case DUPLICATE_PIN_OPTION_VALUE_FAILURE:
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
        case DUPLICATE_PIN_OPTION_VALUE_REQUEST:
            return null;
        case CREATE_PIN_OPTION_VALUE_FAILURE:
        case EDIT_PIN_OPTION_VALUE_FAILURE:
        case DUPLICATE_PIN_OPTION_VALUE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_OPTION_VALUE_REQUEST:
        case EDIT_PIN_OPTION_VALUE_REQUEST:
        case DUPLICATE_PIN_OPTION_VALUE_REQUEST:
            return false;
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case EDIT_PIN_OPTION_VALUE_SUCCESS:
        case DUPLICATE_PIN_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function versionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_VERSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_PIN_OPTION_VERSIONS_FOR_PIN_ID_SUCCESS:
            return updateObjMultiple(state, action.payload);
        case CREATE_PIN_OPTION_VALUE_SUCCESS:
        case EDIT_PIN_OPTION_VALUE_SUCCESS:
        case DUPLICATE_PIN_OPTION_VALUE_SUCCESS:
            return updateObj(
                state,
                action.payload.pinOptionVersion.id,
                action.payload.pinOptionVersion,
            );
        default:
            return state;
    }
}
