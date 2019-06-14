import { combineReducers } from 'redux';

import {
    FETCH_ALL_APPROVED_COMPANIES_GEOCODE_REQUEST,
    FETCH_ALL_APPROVED_COMPANIES_GEOCODE_SUCCESS,
    FETCH_ALL_APPROVED_COMPANIES_GEOCODE_FAILURE
} from 'constants/actionTypes/approvedCompanies';

// import { updateObj } from 'helpers/generic';

export default combineReducers({
    companyGeocode: companyGeocodeReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function companyGeocodeReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_APPROVED_COMPANIES_GEOCODE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_APPROVED_COMPANIES_GEOCODE_REQUEST:
            return true;
        case FETCH_ALL_APPROVED_COMPANIES_GEOCODE_SUCCESS:
        case FETCH_ALL_APPROVED_COMPANIES_GEOCODE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_APPROVED_COMPANIES_GEOCODE_REQUEST:
            return null;
        case FETCH_ALL_APPROVED_COMPANIES_GEOCODE_FAILURE:
            return action.error;
        default:
            return state;
    }
}
