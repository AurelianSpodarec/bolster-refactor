import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_ALL_LIBRARY_DOCUMENTS_REQUEST,
    FETCH_ALL_LIBRARY_DOCUMENTS_SUCCESS,
    FETCH_ALL_LIBRARY_DOCUMENTS_FAILURE,
    FETCH_SINGLE_LIBRARY_DOCUMENT_REQUEST,
    FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS,
    FETCH_SINGLE_LIBRARY_DOCUMENT_FAILURE,
    SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST,
    SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE,
    HARD_DELETE_LIBRARY_DOCUMENT_REQUEST,
    HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    HARD_DELETE_LIBRARY_DOCUMENT_FAILURE,
    CREATE_LIBRARY_DOCUMENT_REQUEST,
    CREATE_LIBRARY_DOCUMENT_SUCCESS,
    CREATE_LIBRARY_DOCUMENT_FAILURE,
    SWITCH_DOCUMENT_LIBRARY_VIEW,
    SWITCH_DOCUMENT_LIBRARY_PAGE_SIZE,
    SWITCH_DOCUMENT_LIBRARY_PAGE,
} from 'constants/actionTypes/documentLibrary';

export default combineReducers({
    documentLibrary: documentLibraryReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
    isDeleting: isDeletingReducer,
    deletionError: deletionErrorReducer,
    deleteSuccess: deleteSuccessReducer,
    libraryView: libraryViewReducer,
    libraryPage: libraryPageReducer,
    libraryPageSize: libraryPageSizeReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_LIBRARY_DOCUMENTS_REQUEST:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_REQUEST:
            return true;
        case FETCH_ALL_LIBRARY_DOCUMENTS_SUCCESS:
        case FETCH_ALL_LIBRARY_DOCUMENTS_FAILURE:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_LIBRARY_DOCUMENTS_REQUEST:
        case FETCH_ALL_LIBRARY_DOCUMENTS_SUCCESS:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_REQUEST:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS:
            return null;
        case FETCH_ALL_LIBRARY_DOCUMENTS_FAILURE:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_LIBRARY_DOCUMENT_REQUEST:
            return true;
        case CREATE_LIBRARY_DOCUMENT_SUCCESS:
        case CREATE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_LIBRARY_DOCUMENT_REQUEST:
        case CREATE_LIBRARY_DOCUMENT_SUCCESS:
            return null;
        case CREATE_LIBRARY_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST:
        case HARD_DELETE_LIBRARY_DOCUMENT_REQUEST:
            return true;
        case SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS:
        case SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE:
        case HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS:
        case HARD_DELETE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST:
        case SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS:
        case HARD_DELETE_LIBRARY_DOCUMENT_REQUEST:
        case HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS:
            return null;
        case SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE:
        case HARD_DELETE_LIBRARY_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST:
        case SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE:
        case HARD_DELETE_LIBRARY_DOCUMENT_REQUEST:
        case HARD_DELETE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        case SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS:
        case HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function documentLibraryReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_LIBRARY_DOCUMENTS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS:
        case CREATE_LIBRARY_DOCUMENT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS:
        case HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_LIBRARY_DOCUMENT_REQUEST:
        case CREATE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        case CREATE_LIBRARY_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function libraryViewReducer(state = 'list', action) {
    switch (action.type) {
        case SWITCH_DOCUMENT_LIBRARY_VIEW:
            return action.view;
        default:
            return state;
    }
}

function libraryPageReducer(state = 1, action) {
    switch (action.type) {
        case SWITCH_DOCUMENT_LIBRARY_PAGE:
            return action.page;
        default:
            return state;
    }
}

function libraryPageSizeReducer(state = 50, action) {
    switch (action.type) {
        case SWITCH_DOCUMENT_LIBRARY_PAGE_SIZE:
            return action.limit;
        default:
            return state;
    }
}
