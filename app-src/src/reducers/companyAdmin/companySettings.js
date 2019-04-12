import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_SETTINGS_REQUEST,
    FETCH_COMPANY_SETTINGS_SUCCESS,
    FETCH_COMPANY_SETTINGS_FAILURE
} from 'constants/actionTypes/companySettings';

export default combineReducers({
    companySettings: companySettingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COMPANY_SETTINGS_REQUEST:
            return true;
        case FETCH_COMPANY_SETTINGS_SUCCESS:
        case FETCH_COMPANY_SETTINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COMPANY_SETTINGS_REQUEST:
            return null;
        case FETCH_COMPANY_SETTINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companySettingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_SETTINGS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
