import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST,
    SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS,
    SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE,
    SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST,
    SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS,
    SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';

export default combineReducers({
    optionValueDocuments: optionValueDocumentsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST:
            return true;
        case SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS:
        case SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_REQUEST:
            return null;
        case SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST:
            // case SA_EDIT_OPTION_VALUE_REQUEST:
            return false;
        case SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS:
            // case SA_EDIT_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = false, action) {
    switch (action.type) {
        case SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_REQUEST:
            // case SA_EDIT_OPTION_VALUE_REQUEST:
            return false;
        case SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_FAILURE:
            // case SA_EDIT_OPTION_VALUE_FAILURE:
            return true;
        default:
            return state;
    }
}

function optionValueDocumentsReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_DOCUMENTS_BY_OPTION_VALUE_SUCCESS:
            return updateObj(state, action.optionValueID, convertArrToObj(action.payload));
        case SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS:
            return {
                ...state,
                [action.optionValueID]: updateObj(
                    state[action.optionValueID],
                    action.payload.id,
                    action.payload,
                ),
            };
        // case SA_CREATE_DOCUMENT_FOR_OPTION_VALUE_SUCCESS:
        // case SA_EDIT_OPTION_VALUE_SUCCESS:
        //     return {
        //         ...state,
        //         [action.manufacturerID]: updateObj(
        //             state[action.manufacturerID],
        //             action.payload.id,
        //             action.payload,
        //         ),
        //     };
        default:
            return state;
    }
}
