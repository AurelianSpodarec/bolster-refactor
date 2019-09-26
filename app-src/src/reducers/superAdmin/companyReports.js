import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    ADMIN_FETCH_COMPANY_REPORTS_REQUEST,
    ADMIN_FETCH_COMPANY_REPORTS_SUCCESS,
    ADMIN_FETCH_COMPANY_REPORTS_FAILURE,
    ADMIN_UPDATE_COMPANY_REPORTS_SORT,
    ADMIN_FETCH_COMPANY_REPORTS_FULL_FAILURE,
    ADMIN_FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    ADMIN_FETCH_COMPANY_REPORTS_FULL_REQUEST
} from 'constants/actionTypes/companyReports';
import { FETCH_STATUS } from 'constants/companyAdmin/enums';

export default combineReducers({
    companyReports: companyReportsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    sort: sortReducer,
    fetchStatus: fetchStatusReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_REQUEST:
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_REQUEST:
            return true;
        case ADMIN_FETCH_COMPANY_REPORTS_SUCCESS:
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_SUCCESS:
        case ADMIN_FETCH_COMPANY_REPORTS_FAILURE:
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_REQUEST:
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_REQUEST:
            return null;
        case ADMIN_FETCH_COMPANY_REPORTS_FAILURE:
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReportsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function sortReducer(state = { sortString: 'createdOn desc' }, action) {
    switch (action.type) {
        case ADMIN_UPDATE_COMPANY_REPORTS_SORT:
            return updateObj(state, 'sortString', action.sortString);
        default:
            return state;
    }
}

function fetchStatusReducer(state = FETCH_STATUS.NONE, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_SUCCESS:
            return state >= FETCH_STATUS.PARTIAL ? state : FETCH_STATUS.PARTIAL;
        case ADMIN_FETCH_COMPANY_REPORTS_FULL_SUCCESS:
            return FETCH_STATUS.FULL;
        default:
            return state;
    }
}
