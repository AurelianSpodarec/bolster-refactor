import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_TRACKING_REQUEST,
    FETCH_COMPANY_TRACKING_SUCCESS,
    FETCH_COMPANY_TRACKING_FAILURE,
    POST_COMPANY_TRACKING_REQUEST,
    POST_COMPANY_TRACKING_SUCCESS,
    POST_COMPANY_TRACKING_FAILURE,
} from 'constants/actionTypes/companies';

import { convertArrToObj, updateObj } from 'helpers/generic';
import { COMPANY_TRACKING_UPDATE_INFO } from 'constants/superAdmin/enums';

export default combineReducers({
    companies: companiesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_TRACKING_REQUEST:
            return true;
        case FETCH_COMPANY_TRACKING_SUCCESS:
        case FETCH_COMPANY_TRACKING_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_TRACKING_REQUEST:
            return null;
        case FETCH_COMPANY_TRACKING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_TRACKING_REQUEST:
            return {};
        case FETCH_COMPANY_TRACKING_SUCCESS:
            return convertArrToObj(action.payload, 'companyID');
        case POST_COMPANY_TRACKING_SUCCESS:
            return updateObj(state, action.updatedInfo.CompanyId, {
                ...state[action.updatedInfo.CompanyId],
                [COMPANY_TRACKING_UPDATE_INFO[action.updatedInfo.ContactPeriod]]:
                    action.updatedInfo.Contacted,
            });
        default:
            return state;
    }
}
