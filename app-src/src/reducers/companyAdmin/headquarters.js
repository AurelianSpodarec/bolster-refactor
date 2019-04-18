import { combineReducers } from 'redux';
import {
    FETCH_ALL_HEADQUARTERS_COMPANIES_REQUEST,
    FETCH_ALL_HEADQUARTERS_COMPANIES_SUCCESS,
    FETCH_ALL_HEADQUARTERS_COMPANIES_FAILURE,
    CREATE_HEADQUARTERS_COMPANY_REQUEST,
    CREATE_HEADQUARTERS_COMPANY_FAILURE,
    CREATE_HEADQUARTERS_COMPANY_SUCCESS
} from 'constants/actionTypes/headquarters';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    companies: companiesReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_HEADQUARTERS_COMPANIES_REQUEST:
            return true;
        case FETCH_ALL_HEADQUARTERS_COMPANIES_SUCCESS:
        case FETCH_ALL_HEADQUARTERS_COMPANIES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_HEADQUARTERS_COMPANIES_REQUEST:
        case CREATE_HEADQUARTERS_COMPANY_REQUEST:
            return null;
        case FETCH_ALL_HEADQUARTERS_COMPANIES_FAILURE:
        case CREATE_HEADQUARTERS_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_HEADQUARTERS_COMPANIES_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_HEADQUARTERS_COMPANY_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
