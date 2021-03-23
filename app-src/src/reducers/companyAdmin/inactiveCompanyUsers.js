import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_INACTIVE_COMPANY_USERS_REQUEST,
    FETCH_INACTIVE_COMPANY_USERS_SUCCESS,
    FETCH_INACTIVE_COMPANY_USERS_FAILURE,
} from 'constants/actionTypes/usersManagement';

export default combineReducers({
    inactive: inactiveCompanyUsersReducer,
    invited: invitedCompanyUsersReducer,
    deleted: deletedCompanyUsersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_INACTIVE_COMPANY_USERS_REQUEST:
            return true;
        case FETCH_INACTIVE_COMPANY_USERS_SUCCESS:
        case FETCH_INACTIVE_COMPANY_USERS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_INACTIVE_COMPANY_USERS_REQUEST:
            return null;
        case FETCH_INACTIVE_COMPANY_USERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function inactiveCompanyUsersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_INACTIVE_COMPANY_USERS_SUCCESS:
            return convertArrToObj(action.payload.inactive);
        default:
            return state;
    }
}

function invitedCompanyUsersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_INACTIVE_COMPANY_USERS_SUCCESS:
            return convertArrToObj(action.payload.invited);
        default:
            return state;
    }
}

function deletedCompanyUsersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_INACTIVE_COMPANY_USERS_SUCCESS:
            return convertArrToObj(action.payload.deleted);
        default:
            return state;
    }
}
