import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_COMPANIES_REQUEST,
    CLIENT_FETCH_COMPANIES_SUCCESS,
    CLIENT_FETCH_COMPANIES_FAILURE,
    CLIENT_SELECT_COMPANY
} from 'constants/client/actionTypes/clientSelectCompany';

export default combineReducers({
    users: companyUsersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    selectedCompany: selectedCompanyReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANIES_REQUEST:
            return true;
        case CLIENT_FETCH_COMPANIES_SUCCESS:
        case CLIENT_FETCH_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANIES_REQUEST:
            return null;
        case CLIENT_FETCH_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyUsersReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANIES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function selectedCompanyReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_SELECT_COMPANY:
            return action.id;
        default:
            return state;
    }
}
