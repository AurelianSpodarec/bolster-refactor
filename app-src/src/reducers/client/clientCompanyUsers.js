import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_COMPANY_USERS_REQUEST,
    CLIENT_FETCH_COMPANY_USERS_SUCCESS,
    CLIENT_FETCH_COMPANY_USERS_FAILURE
} from 'constants/client/actionTypes/clientCompanyUsers';

export default combineReducers({
    users: companyUsersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANY_USERS_REQUEST:
            return true;
        case CLIENT_FETCH_COMPANY_USERS_SUCCESS:
        case CLIENT_FETCH_COMPANY_USERS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANY_USERS_REQUEST:
            return null;
        case CLIENT_FETCH_COMPANY_USERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyUsersReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANY_USERS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
