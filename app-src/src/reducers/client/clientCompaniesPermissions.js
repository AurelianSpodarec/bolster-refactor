import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_PERMISSIONS_REQUEST,
    FETCH_COMPANY_PERMISSIONS_SUCCESS,
    FETCH_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    companiesPermissions: companiesPermissionsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
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

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_PERMISSIONS_REQUEST:
            return null;
        case FETCH_COMPANY_PERMISSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companiesPermissionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_PERMISSIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
