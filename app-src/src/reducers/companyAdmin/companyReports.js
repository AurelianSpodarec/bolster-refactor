import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_COMPANY_REPORTS_REQUEST,
    FETCH_COMPANY_REPORTS_SUCCESS,
    FETCH_COMPANY_REPORTS_FAILURE,
    UPDATE_COMPANY_REPORTS_SORT,
    FETCH_COMPANY_REPORTS_FULL_SUCCESS,
    FETCH_COMPANY_REPORTS_FULL_FAILURE,
    FETCH_COMPANY_REPORTS_FULL_REQUEST,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE,
    FETCH_COMPANY_REPORT_SINGLE_REQUEST,
    FETCH_COMPANY_REPORT_SINGLE_SUCCESS,
    FETCH_COMPANY_REPORT_SINGLE_FAILURE,
    CHANGE_COMPANY_REPORTS_FETCH_FULL,
} from 'constants/actionTypes/companyReports';

import {
    RETRY_REPORT_REQUEST,
    RETRY_REPORT_SUCCESS,
    RETRY_REPORT_FAILURE,
} from 'constants/actionTypes/reports';

import { FETCH_STATUS } from 'constants/companyAdmin/enums';

export default combineReducers({
    companyReports: companyReportsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    sort: sortReducer,
    fetchStatus: fetchStatusReducer,
    fetchingFullReports: fetchingFullReportsReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_REQUEST:
        case FETCH_COMPANY_REPORTS_FULL_REQUEST:
        case RETRY_REPORT_REQUEST:
        case FETCH_COMPANY_REPORT_SINGLE_REQUEST:
            return true;
        case FETCH_COMPANY_REPORTS_SUCCESS:
        case FETCH_COMPANY_REPORTS_FULL_SUCCESS:
        case FETCH_COMPANY_REPORTS_FAILURE:
        case FETCH_COMPANY_REPORTS_FULL_FAILURE:
        case RETRY_REPORT_SUCCESS:
        case RETRY_REPORT_FAILURE:
        case FETCH_COMPANY_REPORT_SINGLE_FAILURE:
        case FETCH_COMPANY_REPORT_SINGLE_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_REQUEST:
        case FETCH_COMPANY_REPORTS_FULL_REQUEST:
        case DELETE_REPORT_REQUEST:
        case RETRY_REPORT_REQUEST:
        case FETCH_COMPANY_REPORT_SINGLE_REQUEST:
            return null;
        case FETCH_COMPANY_REPORTS_FAILURE:
        case FETCH_COMPANY_REPORTS_FULL_FAILURE:
        case DELETE_REPORT_FAILURE:
        case RETRY_REPORT_FAILURE:
        case FETCH_COMPANY_REPORT_SINGLE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyReportsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case FETCH_COMPANY_REPORTS_FULL_SUCCESS:
            return convertArrToObj(action.payload);
        case DELETE_REPORT_SUCCESS:
        case RETRY_REPORT_SUCCESS:
        case FETCH_COMPANY_REPORT_SINGLE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
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

function fetchStatusReducer(state = FETCH_STATUS.NONE, action) {
    switch (action.type) {
        case FETCH_COMPANY_REPORTS_SUCCESS:
            return state >= FETCH_STATUS.PARTIAL ? state : FETCH_STATUS.PARTIAL;
        case FETCH_COMPANY_REPORTS_FULL_SUCCESS:
            return FETCH_STATUS.FULL;
        default:
            return state;
    }
}

function fetchingFullReportsReducer(state = false, action) {
    switch (action.type) {
        case CHANGE_COMPANY_REPORTS_FETCH_FULL:
            return true;
        default:
            return state;
    }
}
