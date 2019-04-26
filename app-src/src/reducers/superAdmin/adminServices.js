import { combineReducers } from 'redux';
import {
    ADMIN_CREATE_SERVICE_REQUEST,
    ADMIN_CREATE_SERVICE_SUCCESS,
    ADMIN_CREATE_SERVICE_FAILURE,
    ADMIN_FETCH_ALL_SERVICES_REQUEST,
    ADMIN_FETCH_ALL_SERVICES_SUCCESS,
    ADMIN_FETCH_ALL_SERVICES_FAILURE,
    ADMIN_EDIT_SERVICE_REQUEST,
    ADMIN_EDIT_SERVICE_SUCCESS,
    ADMIN_EDIT_SERVICE_FAILURE
} from 'constants/actionTypes/services';
import { updateObj, convertArrToObj } from 'helpers/generic';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    updatedServiceID: updatedServiceIDReducer,
    isFetching: isFetchingReducer,
    adminServices: adminServicesReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_ALL_SERVICES_REQUEST:
            return true;
        case ADMIN_FETCH_ALL_SERVICES_SUCCESS:
        case ADMIN_FETCH_ALL_SERVICES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_CREATE_SERVICE_REQUEST:
        case ADMIN_EDIT_SERVICE_REQUEST:
            return false;
        case ADMIN_CREATE_SERVICE_SUCCESS:
        case ADMIN_EDIT_SERVICE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_CREATE_SERVICE_REQUEST:
        case ADMIN_FETCH_ALL_SERVICES_REQUEST:
        case ADMIN_EDIT_SERVICE_REQUEST:
            return null;
        case ADMIN_CREATE_SERVICE_FAILURE:
        case ADMIN_FETCH_ALL_SERVICES_FAILURE:
        case ADMIN_EDIT_SERVICE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function updatedServiceIDReducer(state = 0, action) {
    switch (action.type) {
        case ADMIN_CREATE_SERVICE_REQUEST:
        case ADMIN_EDIT_SERVICE_REQUEST:
            return 0;
        case ADMIN_CREATE_SERVICE_SUCCESS:
        case ADMIN_EDIT_SERVICE_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function adminServicesReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_ALL_SERVICES_SUCCESS:
            return convertArrToObj(action.payload);
        case ADMIN_CREATE_SERVICE_SUCCESS:
        case ADMIN_EDIT_SERVICE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
