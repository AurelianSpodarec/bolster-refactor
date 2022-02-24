import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';
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
    DELETE_JOB_REFERENCE_REQUEST,
    DELETE_JOB_REFERENCE_SUCCESS,
    DELETE_JOB_REFERENCE_FAILURE,
} from 'constants/actionTypes/jobReferences';

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
        case DELETE_JOB_REFERENCE_REQUEST:
            return true;
        case CREATE_JOB_REFERENCE_SUCCESS:
        case CREATE_JOB_REFERENCE_FAILURE:
        case EDIT_JOB_REFERENCE_SUCCESS:
        case EDIT_JOB_REFERENCE_FAILURE:
        case DELETE_JOB_REFERENCE_SUCCESS:
        case DELETE_JOB_REFERENCE_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_JOB_REFERENCE_REQUEST:
        case EDIT_JOB_REFERENCE_REQUEST:
        case DELETE_JOB_REFERENCE_REQUEST:
            return false;
        case CREATE_JOB_REFERENCE_SUCCESS:
        case EDIT_JOB_REFERENCE_SUCCESS:
        case DELETE_JOB_REFERENCE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_JOB_REFERENCE_REQUEST:
        case EDIT_JOB_REFERENCE_REQUEST:
        case DELETE_JOB_REFERENCE_REQUEST:
            return null;
        case CREATE_JOB_REFERENCE_FAILURE:
        case EDIT_JOB_REFERENCE_FAILURE:
        case DELETE_JOB_REFERENCE_FAILURE:
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
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_JOB_REFERENCE_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
