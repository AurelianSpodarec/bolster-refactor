import { combineReducers } from 'redux';

import {
    FETCH_COMPANY_SETTINGS_REQUEST,
    FETCH_COMPANY_SETTINGS_SUCCESS,
    FETCH_COMPANY_SETTINGS_FAILURE,
    EDIT_COMPANY_SETTINGS_REQUEST,
    EDIT_COMPANY_SETTINGS_SUCCESS,
    EDIT_COMPANY_SETTINGS_FAILURE
} from 'constants/actionTypes/companySettings';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    companySettings: companySettingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
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
        case EDIT_COMPANY_SETTINGS_REQUEST:
            return null;
        case FETCH_COMPANY_SETTINGS_FAILURE:
        case EDIT_COMPANY_SETTINGS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_COMPANY_SETTINGS_REQUEST:
            return false;
        case EDIT_COMPANY_SETTINGS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function companySettingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COMPANY_SETTINGS_SUCCESS:
            return action.payload;
        case EDIT_COMPANY_SETTINGS_SUCCESS:
            return updateObj(state, 'companySettings', action.payload);
        default:
            return state;
    }
}
