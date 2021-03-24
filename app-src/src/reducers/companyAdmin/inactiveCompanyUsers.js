import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_INACTIVE_COMPANY_USERS_REQUEST,
    FETCH_INACTIVE_COMPANY_USERS_SUCCESS,
    FETCH_INACTIVE_COMPANY_USERS_FAILURE,
    RECOVER_COMPANY_USER_REQUEST,
    RECOVER_COMPANY_USER_SUCCESS,
    RECOVER_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

export default combineReducers({
    inactive: inactiveCompanyUsersReducer,
    invited: invitedCompanyUsersReducer,
    deleted: deletedCompanyUsersReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postError: postErrorReducer,
    postSuccess: postSuccessReducer,
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

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case RECOVER_COMPANY_USER_REQUEST:
            return true;
        case RECOVER_COMPANY_USER_SUCCESS:
        case RECOVER_COMPANY_USER_FAILURE:
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

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case RECOVER_COMPANY_USER_REQUEST:
            return null;
        case RECOVER_COMPANY_USER_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case RECOVER_COMPANY_USER_REQUEST:
            return false;
        case RECOVER_COMPANY_USER_SUCCESS:
            return true;
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
        case RECOVER_COMPANY_USER_SUCCESS:
            return removeObjItem(state, action.user.id);
        default:
            return state;
    }
}
