import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_COMPANY_REPORTS_REQUEST,
    FETCH_COMPANY_REPORTS_SUCCESS,
    FETCH_COMPANY_REPORTS_FAILURE,
    UPDATE_COMPANY_REPORTS_SORT
} from 'constants/actionTypes/companyReports';

export default combineReducers({
    companyReports: companyReportsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    sort: sortReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_REQUEST:
            return true;
        case FETCH_COMPANY_REPORTS_SUCCESS:
        case FETCH_COMPANY_REPORTS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_REQUEST:
            return null;
        case FETCH_COMPANY_REPORTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReportsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function sortReducer(state = { sortString: 'createdOn desc' }, action) {
    switch (action.type) {
        case UPDATE_COMPANY_REPORTS_SORT:
            return updateObj(state, 'sortString', action.sortString);
        default:
            return state;
    }
}
