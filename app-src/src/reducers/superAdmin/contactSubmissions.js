import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';

import {
    FETCH_ALL_CONTACT_SUBMISSIONS_REQUEST,
    FETCH_ALL_CONTACT_SUBMISSIONS_SUCCESS,
    FETCH_ALL_CONTACT_SUBMISSIONS_FAILURE,
    MARK_CONTACT_SUBMISSION_FAILURE,
    MARK_CONTACT_SUBMISSION_REQUEST,
    MARK_CONTACT_SUBMISSION_SUCCESS,
    DELETE_CONTACT_SUBMISSION_FAILURE,
    DELETE_CONTACT_SUBMISSION_REQUEST,
    DELETE_CONTACT_SUBMISSION_SUCCESS,
    FETCH_SINGLE_CONTACT_SUBMISSION_REQUEST,
    FETCH_SINGLE_CONTACT_SUBMISSION_SUCCESS,
    FETCH_SINGLE_CONTACT_SUBMISSION_FAILURE,
} from 'constants/actionTypes/contactSubmissions';

export default combineReducers({
    contactSubmissions: contactSubmissionsReducer,
    isFetching: isFetchingReducer,
    isDeleting: isDeletingReducer,
    isMarking: isMarkingReducer,
    deletionError: deletionErrorReducer,
    fetchingError: fetchingErrorReducer,
    markingError: markingErrorReducer,
    deleteSuccess: deleteSuccessReducer,
    markingSuccess: markingSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_CONTACT_SUBMISSIONS_REQUEST:
        case FETCH_SINGLE_CONTACT_SUBMISSION_REQUEST:
            return true;
        case FETCH_ALL_CONTACT_SUBMISSIONS_SUCCESS:
        case FETCH_SINGLE_CONTACT_SUBMISSION_SUCCESS:
        case FETCH_ALL_CONTACT_SUBMISSIONS_FAILURE:
        case FETCH_SINGLE_CONTACT_SUBMISSION_FAILURE:
            return false;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_CONTACT_SUBMISSION_REQUEST:
            return true;
        case DELETE_CONTACT_SUBMISSION_SUCCESS:
        case DELETE_CONTACT_SUBMISSION_FAILURE:
            return false;
        default:
            return state;
    }
}

function isMarkingReducer(state = false, action) {
    switch (action.type) {
        case MARK_CONTACT_SUBMISSION_REQUEST:
            return true;
        case MARK_CONTACT_SUBMISSION_SUCCESS:
        case MARK_CONTACT_SUBMISSION_FAILURE:
            return false;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_CONTACT_SUBMISSION_REQUEST:
            return false;
        case DELETE_CONTACT_SUBMISSION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function markingSuccessReducer(state = false, action) {
    switch (action.type) {
        case MARK_CONTACT_SUBMISSION_REQUEST:
            return false;
        case MARK_CONTACT_SUBMISSION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function fetchingErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_CONTACT_SUBMISSIONS_REQUEST:
        case FETCH_SINGLE_CONTACT_SUBMISSION_REQUEST:
            return null;
        case FETCH_ALL_CONTACT_SUBMISSIONS_FAILURE:
        case FETCH_SINGLE_CONTACT_SUBMISSION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_CONTACT_SUBMISSION_REQUEST:
            return null;
        case DELETE_CONTACT_SUBMISSION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function markingErrorReducer(state = null, action) {
    switch (action.type) {
        case MARK_CONTACT_SUBMISSION_REQUEST:
            return null;
        case MARK_CONTACT_SUBMISSION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function contactSubmissionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_CONTACT_SUBMISSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_CONTACT_SUBMISSION_SUCCESS:
            return updateObj(state, action.id, action.payload);
        case DELETE_CONTACT_SUBMISSION_SUCCESS:
            return removeObjItem(state, action.id);
        case MARK_CONTACT_SUBMISSION_SUCCESS:
            return updateObj(state, action.data.id, action.data);
        default:
            return state;
    }
}
