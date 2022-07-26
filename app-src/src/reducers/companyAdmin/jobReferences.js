import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_JOB_REFERENCES_REQUEST,
    FETCH_JOB_REFERENCES_SUCCESS,
    FETCH_JOB_REFERENCES_FAILURE,
    CREATE_JOB_REFERENCE_REQUEST,
    CREATE_JOB_REFERENCE_SUCCESS,
    CREATE_JOB_REFERENCE_FAILURE,
    EDIT_JOB_REFERENCE_REQUEST,
    EDIT_JOB_REFERENCE_SUCCESS,
    EDIT_JOB_REFERENCE_FAILURE,
    ENABLE_JOB_REFERENCE_REQUEST,
    ENABLE_JOB_REFERENCE_SUCCESS,
    ENABLE_JOB_REFERENCE_FAILURE,
    DISABLE_JOB_REFERENCE_REQUEST,
    DISABLE_JOB_REFERENCE_SUCCESS,
    DISABLE_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';
import { SET_API_FIELD_ERRORS } from '../../constants/actionTypes/generic';

export default combineReducers({
    jobReferences: jobReferencesReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_JOB_REFERENCES_REQUEST:
            return true;
        case FETCH_JOB_REFERENCES_SUCCESS:
        case FETCH_JOB_REFERENCES_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_JOB_REFERENCES_REQUEST:
            return null;
        case FETCH_JOB_REFERENCES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_JOB_REFERENCE_REQUEST:
        case EDIT_JOB_REFERENCE_REQUEST:
        case ENABLE_JOB_REFERENCE_REQUEST:
        case DISABLE_JOB_REFERENCE_REQUEST:
            return true;
        case CREATE_JOB_REFERENCE_SUCCESS:
        case CREATE_JOB_REFERENCE_FAILURE:
        case EDIT_JOB_REFERENCE_SUCCESS:
        case EDIT_JOB_REFERENCE_FAILURE:
        case ENABLE_JOB_REFERENCE_SUCCESS:
        case ENABLE_JOB_REFERENCE_FAILURE:
        case DISABLE_JOB_REFERENCE_SUCCESS:
        case DISABLE_JOB_REFERENCE_FAILURE:
        case SET_API_FIELD_ERRORS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_JOB_REFERENCE_REQUEST:
        case EDIT_JOB_REFERENCE_REQUEST:
        case ENABLE_JOB_REFERENCE_REQUEST:
        case DISABLE_JOB_REFERENCE_REQUEST:
            return false;
        case CREATE_JOB_REFERENCE_SUCCESS:
        case EDIT_JOB_REFERENCE_SUCCESS:
        case ENABLE_JOB_REFERENCE_SUCCESS:
        case DISABLE_JOB_REFERENCE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_JOB_REFERENCE_REQUEST:
        case EDIT_JOB_REFERENCE_REQUEST:
        case ENABLE_JOB_REFERENCE_REQUEST:
        case DISABLE_JOB_REFERENCE_REQUEST:
            return null;
        case CREATE_JOB_REFERENCE_FAILURE:
        case EDIT_JOB_REFERENCE_FAILURE:
        case ENABLE_JOB_REFERENCE_FAILURE:
        case DISABLE_JOB_REFERENCE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function jobReferencesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_JOB_REFERENCES_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_JOB_REFERENCE_SUCCESS:
        case EDIT_JOB_REFERENCE_SUCCESS:
        case ENABLE_JOB_REFERENCE_SUCCESS:
        case DISABLE_JOB_REFERENCE_SUCCESS:
        case ENABLE_JOB_REFERENCE_FAILURE:
        case DISABLE_JOB_REFERENCE_FAILURE:
            return updateObj(state, action.payload.id, action.payload);
        case ENABLE_JOB_REFERENCE_REQUEST:
        case DISABLE_JOB_REFERENCE_REQUEST:
            return updateObj(state, action.payload.id, {
                ...action.payload,
                isDisabled: !action.payload.isDisabled,
            });
        default:
            return state;
    }
}
