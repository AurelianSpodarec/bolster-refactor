import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    ADMIN_FETCH_COMPANY_REPORTS_REQUEST,
    ADMIN_FETCH_COMPANY_REPORTS_SUCCESS,
    ADMIN_FETCH_COMPANY_REPORTS_FAILURE
} from 'constants/actionTypes/companyReports';

export default combineReducers({
    companyReports: companyReportsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_REQUEST:
            return true;
        case ADMIN_FETCH_COMPANY_REPORTS_SUCCESS:
        case ADMIN_FETCH_COMPANY_REPORTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_REQUEST:
            return null;
        case ADMIN_FETCH_COMPANY_REPORTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReportsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_COMPANY_REPORTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
