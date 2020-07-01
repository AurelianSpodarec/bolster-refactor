import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import { removeDeletedDocumentVersion } from 'helpers/redux';
import {
    FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST,
    FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS,
    FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE,
    CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST,
    CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS,
    CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE,
    EDIT_OPTION_VALUE_DOCUMENT_REQUEST,
    EDIT_OPTION_VALUE_DOCUMENT_SUCCESS,
    EDIT_OPTION_VALUE_DOCUMENT_FAILURE,
    CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
    CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
    DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST,
    DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS,
    DELETE_OPTION_VALUE_DOCUMENT_VERSION_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export default combineReducers({
    optionValueDocuments: optionValueDocumentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
    deleteSuccess: deleteSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST:
            return true;
        case FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS:
        case FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST:
            return null;
        case FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST:
        case EDIT_OPTION_VALUE_DOCUMENT_REQUEST:
        case CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST:
            return false;
        case CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS:
        case EDIT_OPTION_VALUE_DOCUMENT_SUCCESS:
        case CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = false, action) {
    switch (action.type) {
        case CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST:
        case EDIT_OPTION_VALUE_DOCUMENT_REQUEST:
        case CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_REQUEST:
        case DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST:
            return false;
        case CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE:
        case EDIT_OPTION_VALUE_DOCUMENT_FAILURE:
        case CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_FAILURE:
        case DELETE_OPTION_VALUE_DOCUMENT_VERSION_FAILURE:
            return true;
        default:
            return state;
    }
}

// for redirect after delete, can't use postsuccess as edit shares that success bool
function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_OPTION_VALUE_DOCUMENT_VERSION_REQUEST:
            return false;
        case DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS:
            return true;
        default:
            return state;
    }
}

function optionValueDocumentsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS:
            return updateObj(state, action.optionValueID, convertArrToObj(action.payload));
        case CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS:
        case EDIT_OPTION_VALUE_DOCUMENT_SUCCESS:
        case CREATE_NEW_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS:
            return {
                ...state,
                [action.optionValueID]: updateObj(
                    state[action.optionValueID],
                    action.payload.id,
                    action.payload,
                ),
            };
        case DELETE_OPTION_VALUE_DOCUMENT_VERSION_SUCCESS:
            return action.isLastVersion
                ? updateObj(
                      state,
                      action.optionValueID,
                      removeObjItem(state[action.optionValueID], action.documentID),
                  )
                : {
                      ...state,
                      [action.optionValueID]: removeDeletedDocumentVersion(
                          state[action.optionValueID],
                          action.documentID,
                          action.versionID,
                      ),
                  };

        default:
            return state;
    }
}
