import { combineReducers } from 'redux';
import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
    EDIT_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_PASSWORD_REQUEST,
    EDIT_USER_PASSWORD_SUCCESS,
    EDIT_USER_PASSWORD_FAILURE,
    UPDATE_USERS_FILTERS,
    ADMIN_FETCH_COMPANY_USERS_REQUEST,
    ADMIN_FETCH_COMPANY_USERS_FAILURE,
    ADMIN_FETCH_COMPANY_USERS_SUCCESS,
    ADMIN_FETCH_COMPANY_USERS_INFO_SUCCESS,
    ADMIN_FETCH_USERS_BY_SEARCH_SUCCESS,
    ADMIN_FETCH_USERS_BY_SEARCH_REQUEST,
    ADMIN_FETCH_USERS_BY_SEARCH_FAILURE,
    FORCE_CONFIRM_USER_EMAIL_REQUEST,
    FORCE_CONFIRM_USER_EMAIL_SUCCESS,
    FORCE_CONFIRM_USER_EMAIL_FAILURE,
    REMOVE_USER_LOCKOUT_REQUEST,
    REMOVE_USER_LOCKOUT_SUCCESS,
    REMOVE_USER_LOCKOUT_FAILURE,
    FETCH_COMPANY_ADMIN_USERS_REQUEST,
    FETCH_COMPANY_ADMIN_USERS_SUCCESS,
    FETCH_COMPANY_ADMIN_USERS_FAILURE,
} from 'constants/actionTypes/users';
import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    ADMIN_CREATE_COMPANY_USER_REQUEST,
    ADMIN_CREATE_COMPANY_USER_SUCCESS,
    ADMIN_CREATE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';
import {
    ADMIN_EDIT_COMPANY_OWNER_REQUEST,
    ADMIN_EDIT_COMPANY_OWNER_SUCCESS,
    ADMIN_EDIT_COMPANY_OWNER_FAILURE,
} from 'constants/actionTypes/companies';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    users: usersReducer,
    postSuccess: postSuccessReducer,
    updatedUserID: updatedUserIDReducer,
    filters: filtersReducer,
    count: countReducer,
    companyUsers: companyUsersReducer,
    companyUsersInfo: companyUsersInfoReducer,
    companyAdmins: companyAdminUsersReducer,
    isPosting: isPostingReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
        case ADMIN_FETCH_COMPANY_USERS_REQUEST:
        case ADMIN_FETCH_USERS_BY_SEARCH_REQUEST:
        case FETCH_COMPANY_ADMIN_USERS_REQUEST:
            return true;
        case FETCH_ALL_USERS_SUCCESS:
        case FETCH_ALL_USERS_FAILURE:
        case ADMIN_FETCH_COMPANY_USERS_FAILURE:
        case ADMIN_FETCH_COMPANY_USERS_SUCCESS:
        case ADMIN_FETCH_USERS_BY_SEARCH_SUCCESS:
        case ADMIN_FETCH_USERS_BY_SEARCH_FAILURE:
        case FETCH_COMPANY_ADMIN_USERS_FAILURE:
        case FETCH_COMPANY_ADMIN_USERS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_USER_REQUEST:
        case EDIT_USER_PASSWORD_REQUEST:
        case ADMIN_CREATE_COMPANY_USER_REQUEST:
        case FORCE_CONFIRM_USER_EMAIL_REQUEST:
        case REMOVE_USER_LOCKOUT_REQUEST:
        case ADMIN_EDIT_COMPANY_OWNER_REQUEST:
            return false;
        case EDIT_USER_SUCCESS:
        case EDIT_USER_PASSWORD_SUCCESS:
        case ADMIN_CREATE_COMPANY_USER_SUCCESS:
        case FORCE_CONFIRM_USER_EMAIL_SUCCESS:
        case REMOVE_USER_LOCKOUT_SUCCESS:
        case ADMIN_EDIT_COMPANY_OWNER_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case EDIT_USER_REQUEST:
        case FETCH_ALL_USERS_REQUEST:
        case EDIT_USER_PASSWORD_REQUEST:
        case ADMIN_FETCH_COMPANY_USERS_REQUEST:
        case ADMIN_CREATE_COMPANY_USER_REQUEST:
        case ADMIN_FETCH_USERS_BY_SEARCH_REQUEST:
        case FORCE_CONFIRM_USER_EMAIL_REQUEST:
        case REMOVE_USER_LOCKOUT_REQUEST:
        case FETCH_COMPANY_ADMIN_USERS_REQUEST:
        case ADMIN_EDIT_COMPANY_OWNER_REQUEST:
            return null;
        case FETCH_ALL_USERS_FAILURE:
        case EDIT_USER_FAILURE:
        case EDIT_USER_PASSWORD_FAILURE:
        case ADMIN_FETCH_COMPANY_USERS_FAILURE:
        case ADMIN_CREATE_COMPANY_USER_FAILURE:
        case ADMIN_FETCH_USERS_BY_SEARCH_FAILURE:
        case FORCE_CONFIRM_USER_EMAIL_FAILURE:
        case REMOVE_USER_LOCKOUT_FAILURE:
        case FETCH_COMPANY_ADMIN_USERS_FAILURE:
        case ADMIN_EDIT_COMPANY_OWNER_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function usersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        case ADMIN_FETCH_USERS_BY_SEARCH_SUCCESS:
            return convertArrToObj(action.payload.users);
        case EDIT_USER_SUCCESS:
        case ADMIN_CREATE_COMPANY_USER_SUCCESS:
        case FORCE_CONFIRM_USER_EMAIL_SUCCESS:
        case REMOVE_USER_LOCKOUT_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case ADMIN_FETCH_COMPANY_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function companyUsersReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_USERS_REQUEST:
            return {};
        case ADMIN_CREATE_COMPANY_USER_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case ADMIN_FETCH_COMPANY_USERS_SUCCESS:
            return { ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}

function companyUsersInfoReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_USERS_INFO_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

function updatedUserIDReducer(state = 0, action) {
    switch (action.type) {
        case EDIT_USER_REQUEST:
        case EDIT_USER_PASSWORD_REQUEST:
            return 0;
        case EDIT_USER_SUCCESS:
        case EDIT_USER_PASSWORD_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function filtersReducer(state = { searchTerm: '', role: '', page: 1 }, action) {
    switch (action.type) {
        case UPDATE_USERS_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
function countReducer(state = 0, action) {
    switch (action.type) {
        case ADMIN_FETCH_USERS_BY_SEARCH_SUCCESS:
            return action.payload.count;
        default:
            return state;
    }
}

function companyAdminUsersReducer(state = { companyAdmins: {} }, action) {
    switch (action.type) {
        case FETCH_COMPANY_ADMIN_USERS_SUCCESS:
            return { ...convertArrToObj(action.payload) };
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_EDIT_COMPANY_OWNER_REQUEST:
        case ADMIN_CREATE_COMPANY_USER_REQUEST:
            return true;
        case ADMIN_EDIT_COMPANY_OWNER_FAILURE:
        case ADMIN_EDIT_COMPANY_OWNER_SUCCESS:
        case ADMIN_CREATE_COMPANY_USER_SUCCESS:
        case ADMIN_CREATE_COMPANY_USER_FAILURE:
            return false;
        default:
            return state;
    }
}
