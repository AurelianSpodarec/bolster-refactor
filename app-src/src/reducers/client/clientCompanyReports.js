import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    CLIENT_FETCH_COMPANY_REPORTS_REQUEST,
    CLIENT_FETCH_COMPANY_REPORTS_SUCCESS,
    CLIENT_FETCH_COMPANY_REPORTS_FAILURE,
    CLIENT_UPDATE_COMPANY_REPORTS_SORT,
    CLIENT_FETCH_COMPANY_REPORTS_FULL_REQUEST,
    CLIENT_FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    CLIENT_FETCH_COMPANY_REPORTS_FULL_FAILURE
} from 'constants/client/actionTypes/clientCompanyReports';

export default combineReducers({
    companyReports: companyReportsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    sort: sortReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANY_REPORTS_REQUEST:
        case CLIENT_FETCH_COMPANY_REPORTS_FULL_REQUEST:
            return true;
        case CLIENT_FETCH_COMPANY_REPORTS_SUCCESS:
        case CLIENT_FETCH_COMPANY_REPORTS_FULL_SUCCESS:
        case CLIENT_FETCH_COMPANY_REPORTS_FAILURE:
        case CLIENT_FETCH_COMPANY_REPORTS_FULL_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANY_REPORTS_REQUEST:
        case CLIENT_FETCH_COMPANY_REPORTS_FULL_REQUEST:
            return null;
        case CLIENT_FETCH_COMPANY_REPORTS_FAILURE:
        case CLIENT_FETCH_COMPANY_REPORTS_FULL_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReportsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_COMPANY_REPORTS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case CLIENT_FETCH_COMPANY_REPORTS_FULL_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
function sortReducer(state = { sortString: 'createdOn desc' }, action) {
    switch (action.type) {
        case CLIENT_UPDATE_COMPANY_REPORTS_SORT:
            return updateObj(state, 'sortString', action.sortString);
        default:
            return state;
    }
}
