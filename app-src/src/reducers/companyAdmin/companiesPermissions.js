import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_PERMISSIONS_REQUEST,
    FETCH_COMPANY_PERMISSIONS_SUCCESS,
    FETCH_COMPANY_PERMISSIONS_FAILURE,
    ADD_COMPANY_PERMISSIONS_REQUEST,
    ADD_COMPANY_PERMISSIONS_SUCCESS,
    ADD_COMPANY_PERMISSIONS_FAILURE,
    DELETE_COMPANY_PERMISSIONS_REQUEST,
    DELETE_COMPANY_PERMISSIONS_SUCCESS,
    DELETE_COMPANY_PERMISSIONS_FAILURE,
    EDIT_COMPANY_PERMISSIONS_REQUEST,
    EDIT_COMPANY_PERMISSIONS_SUCCESS,
    EDIT_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';
import { updateObj, convertArrToObj, removeObjItem } from 'helpers/generic';

export default combineReducers({
    companiesPermissions: companiesPermissionsReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_PERMISSIONS_REQUEST:
            return true;
        case FETCH_COMPANY_PERMISSIONS_SUCCESS:
        case FETCH_COMPANY_PERMISSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADD_COMPANY_PERMISSIONS_REQUEST:
        case DELETE_COMPANY_PERMISSIONS_REQUEST:
        case EDIT_COMPANY_PERMISSIONS_REQUEST:
            return true;
        case ADD_COMPANY_PERMISSIONS_SUCCESS:
        case ADD_COMPANY_PERMISSIONS_FAILURE:
        case DELETE_COMPANY_PERMISSIONS_SUCCESS:
        case DELETE_COMPANY_PERMISSIONS_FAILURE:
        case EDIT_COMPANY_PERMISSIONS_SUCCESS:
        case EDIT_COMPANY_PERMISSIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_PERMISSIONS_REQUEST:
        case EDIT_COMPANY_PERMISSIONS_REQUEST:
            return null;
        case FETCH_COMPANY_PERMISSIONS_FAILURE:
        case EDIT_COMPANY_PERMISSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_COMPANY_PERMISSIONS_FAILURE:
        case ADD_COMPANY_PERMISSIONS_REQUEST:
        case DELETE_COMPANY_PERMISSIONS_REQUEST:
        case DELETE_COMPANY_PERMISSIONS_FAILURE:
        case EDIT_COMPANY_PERMISSIONS_REQUEST:
        case EDIT_COMPANY_PERMISSIONS_FAILURE:
            return false;
        case ADD_COMPANY_PERMISSIONS_SUCCESS:
        case DELETE_COMPANY_PERMISSIONS_SUCCESS:
        case EDIT_COMPANY_PERMISSIONS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function companiesPermissionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_PERMISSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case DELETE_COMPANY_PERMISSIONS_SUCCESS:
            return removeObjItem(state, action.id);
        case EDIT_COMPANY_PERMISSIONS_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
