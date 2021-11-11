import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItems } from 'helpers/generic';
import {
    SEARCH_ALL_LIBRARY_DOCUMENTS_REQUEST,
    SEARCH_ALL_LIBRARY_DOCUMENTS_SUCCESS,
    SEARCH_ALL_LIBRARY_DOCUMENTS_FAILURE,
    FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_REQUEST,
    FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_SUCCESS,
    FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_FAILURE,
    FETCH_SINGLE_LIBRARY_DOCUMENT_REQUEST,
    FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS,
    FETCH_SINGLE_LIBRARY_DOCUMENT_FAILURE,
    SOFT_DELETE_LIBRARY_DOCUMENT_REQUEST,
    SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    SOFT_DELETE_LIBRARY_DOCUMENT_FAILURE,
    HARD_DELETE_LIBRARY_DOCUMENT_REQUEST,
    HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS,
    HARD_DELETE_LIBRARY_DOCUMENT_FAILURE,
    RESTORE_LIBRARY_DOCUMENT_REQUEST,
    RESTORE_LIBRARY_DOCUMENT_SUCCESS,
    RESTORE_LIBRARY_DOCUMENT_FAILURE,
    CREATE_LIBRARY_DOCUMENT_FOLDER_REQUEST,
    CREATE_LIBRARY_DOCUMENT_FOLDER_SUCCESS,
    CREATE_LIBRARY_DOCUMENT_FOLDER_FAILURE,
    EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS,
    EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE,
    SWITCH_DOCUMENT_LIBRARY_VIEW,
    SWITCH_DOCUMENT_LIBRARY_PAGE_SIZE,
    SWITCH_DOCUMENT_LIBRARY_PAGE,
    ADD_DOCUMENT_LIBRARY_ITEM,
    SWITCH_DOCUMENT_LIBRARY_FILTER,
    SWITCH_DOCUMENT_LIBRARY_SEARCH_TERM,
    FETCH_STORAGE_INFORMATION_SUCCESS,
    FETCH_STORAGE_INFORMATION_FAILURE,
    FETCH_STORAGE_INFORMATION_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS,
    EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE,
} from 'constants/actionTypes/documentLibrary';

export default combineReducers({
    documentLibrary: documentLibraryReducer,
    storageInformation: storageInformationReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    isPosting: isPostingReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
    isDeleting: isDeletingReducer,
    deleteError: deleteErrorReducer,
    deleteSuccess: deleteSuccessReducer,
    libraryView: libraryViewReducer,
    libraryPage: libraryPageReducer,
    libraryPageSize: libraryPageSizeReducer,
    libraryFilter: libraryFilterReducer,
    librarySearchTerm: librarySearchTermReducer,
    isRestoring: isRestoringReducer,
    restoreError: restoreErrorReducer,
    restoreSuccess: restoreSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SEARCH_ALL_LIBRARY_DOCUMENTS_REQUEST:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_REQUEST:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_REQUEST:
            return true;
        case SEARCH_ALL_LIBRARY_DOCUMENTS_SUCCESS:
        case SEARCH_ALL_LIBRARY_DOCUMENTS_FAILURE:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_FAILURE:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_SUCCESS:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_FAILURE:
            return false;
        case FETCH_STORAGE_INFORMATION_REQUEST:
            return true;
        case FETCH_STORAGE_INFORMATION_SUCCESS:
            return false;
        case FETCH_STORAGE_INFORMATION_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case SEARCH_ALL_LIBRARY_DOCUMENTS_REQUEST:
        case SEARCH_ALL_LIBRARY_DOCUMENTS_SUCCESS:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_REQUEST:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_REQUEST:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_SUCCESS:
            return null;
        case SEARCH_ALL_LIBRARY_DOCUMENTS_FAILURE:
        case FETCH_SINGLE_LIBRARY_DOCUMENT_FAILURE:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_FAILURE:
            return action.error;
        case FETCH_STORAGE_INFORMATION_REQUEST:
            return null;
        case FETCH_STORAGE_INFORMATION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_LIBRARY_DOCUMENT_FOLDER_REQUEST:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST:
            return true;
        case CREATE_LIBRARY_DOCUMENT_FOLDER_SUCCESS:
        case CREATE_LIBRARY_DOCUMENT_FOLDER_FAILURE:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_LIBRARY_DOCUMENT_FOLDER_REQUEST:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST:
            return null;
        case CREATE_LIBRARY_DOCUMENT_FOLDER_FAILURE:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE:
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

function deleteErrorReducer(state = null, action) {
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

function isRestoringReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_LIBRARY_DOCUMENT_REQUEST:
            return true;
        case RESTORE_LIBRARY_DOCUMENT_SUCCESS:
        case RESTORE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        default:
            return state;
    }
}

function restoreErrorReducer(state = null, action) {
    switch (action.type) {
        case RESTORE_LIBRARY_DOCUMENT_REQUEST:
        case RESTORE_LIBRARY_DOCUMENT_SUCCESS:
            return null;
        case RESTORE_LIBRARY_DOCUMENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function restoreSuccessReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_LIBRARY_DOCUMENT_REQUEST:
        case RESTORE_LIBRARY_DOCUMENT_FAILURE:
            return false;
        case RESTORE_LIBRARY_DOCUMENT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function documentLibraryReducer(state = {}, action) {
    switch (action.type) {
        case SEARCH_ALL_LIBRARY_DOCUMENTS_SUCCESS:
        case FETCH_DOCUMENT_LIBRARY_FILES_FOR_COMPANY_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_LIBRARY_DOCUMENT_SUCCESS:
        case CREATE_LIBRARY_DOCUMENT_FOLDER_SUCCESS:
        case ADD_DOCUMENT_LIBRARY_ITEM:
            return updateObj(state, action.payload.id, action.payload);
        case EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case HARD_DELETE_LIBRARY_DOCUMENT_SUCCESS:
            return removeObjItems(state, action.ids);
        case SOFT_DELETE_LIBRARY_DOCUMENT_SUCCESS:
        case RESTORE_LIBRARY_DOCUMENT_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}

function storageInformationReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_STORAGE_INFORMATION_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_LIBRARY_DOCUMENT_FOLDER_REQUEST:
        case CREATE_LIBRARY_DOCUMENT_FOLDER_FAILURE:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_REQUEST:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_FAILURE:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_REQUEST:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_FAILURE:
            return false;
        case CREATE_LIBRARY_DOCUMENT_FOLDER_SUCCESS:
        case EDIT_DOCUMENT_LIBRARY_ITEMS_SUCCESS:
        case EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS:
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

function libraryFilterReducer(state = null, action) {
    switch (action.type) {
        case SWITCH_DOCUMENT_LIBRARY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function librarySearchTermReducer(state = '', action) {
    switch (action.type) {
        case SWITCH_DOCUMENT_LIBRARY_SEARCH_TERM:
            return action.searchTerm;
        default:
            return state;
    }
}
