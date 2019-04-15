import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_ALL_SITES_REQUEST,
    FETCH_ALL_SITES_SUCCESS,
    FETCH_ALL_SITES_FAILURE,
    FETCH_SINGLE_SITE_REQUEST,
    FETCH_SINGLE_SITE_SUCCESS,
    FETCH_SINGLE_SITE_FAILURE,
    CREATE_SITE_REQUEST,
    CREATE_SITE_SUCCESS,
    CREATE_SITE_FAILURE,
    EDIT_SITE_REQUEST,
    EDIT_SITE_SUCCESS,
    EDIT_SITE_FAILURE,
    UPDATE_SITES_FILTERS,
    DELETE_SITE_REQUEST,
    DELETE_SITE_SUCCESS,
    DELETE_SITE_FAILURE,
    ARCHIVE_SITE_REQUEST,
    ARCHIVE_SITE_SUCCESS,
    ARCHIVE_SITE_FAILURE
} from 'constants/actionTypes/sites';

export default combineReducers({
    sites: sitesReducer,
    updatedSiteID: updatedSiteReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    deleteSuccess: deleteSuccessReducer,
    error: errorReducer,
    filters: filtersReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_SITES_REQUEST:
        case FETCH_SINGLE_SITE_REQUEST:
            return true;
        case FETCH_ALL_SITES_SUCCESS:
        case FETCH_ALL_SITES_FAILURE:
        case FETCH_SINGLE_SITE_SUCCESS:
        case FETCH_SINGLE_SITE_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_SITE_REQUEST:
        case EDIT_SITE_REQUEST:
        case DELETE_SITE_REQUEST:
        case ARCHIVE_SITE_REQUEST:
            return false;
        case CREATE_SITE_SUCCESS:
        case EDIT_SITE_SUCCESS:
        case DELETE_SITE_SUCCESS:
        case ARCHIVE_SITE_SUCCESS:
            return true;
        default:
            return state;
    }
}

// for redirect after delete, can't use postsuccess as edit shares that success bool
function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_SITE_REQUEST:
            return false;
        case DELETE_SITE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case CREATE_SITE_REQUEST:
        case EDIT_SITE_REQUEST:
        case DELETE_SITE_REQUEST:
        case ARCHIVE_SITE_REQUEST:
            return false;
        case CREATE_SITE_FAILURE:
        case EDIT_SITE_FAILURE:
        case DELETE_SITE_FAILURE:
        case ARCHIVE_SITE_FAILURE:
            return true;
        default:
            return state;
    }
}

function updatedSiteReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_SITE_SUCCESS:
        case EDIT_SITE_SUCCESS:
        case ARCHIVE_SITE_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ARCHIVE_SITE_REQUEST:
        case CREATE_SITE_REQUEST:
        case DELETE_SITE_REQUEST:
        case EDIT_SITE_REQUEST:
        case FETCH_ALL_SITES_REQUEST:
        case FETCH_SINGLE_SITE_REQUEST:
            return null;
        case ARCHIVE_SITE_FAILURE:
        case CREATE_SITE_FAILURE:
        case DELETE_SITE_FAILURE:
        case EDIT_SITE_FAILURE:
        case FETCH_ALL_SITES_FAILURE:
        case FETCH_SINGLE_SITE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function sitesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SITES_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_SITE_SUCCESS:
        case CREATE_SITE_SUCCESS:
        case ARCHIVE_SITE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function filtersReducer(state = { name: '', status: '' }, action) {
    switch (action.type) {
        case UPDATE_SITES_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
