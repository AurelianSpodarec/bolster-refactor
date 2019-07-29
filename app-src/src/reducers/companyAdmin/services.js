import { combineReducers } from 'redux';
import {
    COMPANY_ADMIN_FETCH_ALL_SERVICES_REQUEST,
    COMPANY_ADMIN_FETCH_ALL_SERVICES_SUCCESS,
    COMPANY_ADMIN_FETCH_ALL_SERVICES_FAILURE,
    COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_REQUEST,
    COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_SUCCESS,
    COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_FAILURE
} from 'constants/actionTypes/services';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    services: servicesReducer,
    historicServices: companyHistoricServicesReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case COMPANY_ADMIN_FETCH_ALL_SERVICES_REQUEST:
        case COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_REQUEST:
            return true;
        case COMPANY_ADMIN_FETCH_ALL_SERVICES_SUCCESS:
        case COMPANY_ADMIN_FETCH_ALL_SERVICES_FAILURE:
        case COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_SUCCESS:
        case COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_REQUEST:
        case COMPANY_ADMIN_FETCH_ALL_SERVICES_REQUEST:
            return null;
        case COMPANY_ADMIN_FETCH_ALL_SERVICES_FAILURE:
        case COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function servicesReducer(state = {}, action) {
    switch (action.type) {
        case COMPANY_ADMIN_FETCH_ALL_SERVICES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function companyHistoricServicesReducer(state = {}, action) {
    switch (action.type) {
        case COMPANY_ADMIN_FETCH_HISTORIC_SERVICES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
