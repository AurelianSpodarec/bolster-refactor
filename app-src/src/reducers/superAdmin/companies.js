import { combineReducers } from 'redux';

import {
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE,
    UPDATE_COMPANIES_FILTERS,
    FETCH_COMPANY_PIN_OPTION_TYPES_REQUEST,
    FETCH_COMPANY_PIN_OPTION_TYPES_SUCCESS,
    FETCH_COMPANY_PIN_OPTION_TYPES_FAILURE,
    SA_TOGGLE_COMPANY_ON_CLIENT_LIST_REQUEST,
    SA_TOGGLE_COMPANY_ON_CLIENT_LIST_SUCCESS,
    SA_TOGGLE_COMPANY_ON_CLIENT_LIST_FAILURE,
    ADMIN_EDIT_COMPANY_ADDRESS_REQUEST,
    ADMIN_EDIT_COMPANY_ADDRESS_SUCCESS,
    ADMIN_EDIT_COMPANY_ADDRESS_FAILURE,
    ADMIN_EDIT_COMPANY_FREE_CREDIT_REQUEST,
    ADMIN_EDIT_COMPANY_FREE_CREDIT_SUCCESS,
    ADMIN_EDIT_COMPANY_FREE_CREDIT_FAILURE,
    ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_FAILURE,
    ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_REQUEST,
    ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_SUCCESS,
    ENABLE_COMPANY_REQUEST,
    DISABLE_COMPANY_REQUEST,
    ENABLE_COMPANY_SUCCESS,
    ENABLE_COMPANY_FAILURE,
    DISABLE_COMPANY_SUCCESS,
    DISABLE_COMPANY_FAILURE,
} from 'constants/actionTypes/companies';
import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_SINGLE_COMPANY_SUCCESS,
    FETCH_SINGLE_COMPANY_REQUEST,
    FETCH_SINGLE_COMPANY_FAILURE,
    FETCH_SINGLE_COMPANY_FOR_INVOICE_FAILURE,
    FETCH_SINGLE_COMPANY_FOR_INVOICE_REQUEST,
    FETCH_SINGLE_COMPANY_FOR_INVOICE_SUCCESS,
} from 'constants/actionTypes/companiesWithPermissions';
import { COMPANY_TYPES } from 'constants/companyAdmin/enums';

export default combineReducers({
    companies: companiesReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
    filters: filtersReducer,
    singleCompany: singleCompanyReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_REQUEST:
        case FETCH_SINGLE_COMPANY_REQUEST:
        case FETCH_SINGLE_COMPANY_FOR_INVOICE_REQUEST:
        case FETCH_COMPANY_PIN_OPTION_TYPES_REQUEST:
            return true;
        case FETCH_ALL_COMPANIES_SUCCESS:
        case FETCH_ALL_COMPANIES_FAILURE:
        case FETCH_SINGLE_COMPANY_FAILURE:
        case FETCH_SINGLE_COMPANY_SUCCESS:
        case FETCH_SINGLE_COMPANY_FOR_INVOICE_FAILURE:
        case FETCH_SINGLE_COMPANY_FOR_INVOICE_SUCCESS:
        case FETCH_COMPANY_PIN_OPTION_TYPES_SUCCESS:
        case FETCH_COMPANY_PIN_OPTION_TYPES_FAILURE:
            return false;
        default:
            return state;
    }
}
function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_EDIT_COMPANY_ADDRESS_REQUEST:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_REQUEST:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_REQUEST:
        case ENABLE_COMPANY_REQUEST:
        case DISABLE_COMPANY_REQUEST:
            return false;
        case ADMIN_EDIT_COMPANY_ADDRESS_SUCCESS:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_SUCCESS:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_SUCCESS:
        case ENABLE_COMPANY_SUCCESS:
        case DISABLE_COMPANY_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case SA_TOGGLE_COMPANY_ON_CLIENT_LIST_REQUEST:
        case ADMIN_EDIT_COMPANY_ADDRESS_REQUEST:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_REQUEST:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_REQUEST:
        case ENABLE_COMPANY_REQUEST:
        case DISABLE_COMPANY_REQUEST:
            return true;
        case SA_TOGGLE_COMPANY_ON_CLIENT_LIST_SUCCESS:
        case SA_TOGGLE_COMPANY_ON_CLIENT_LIST_FAILURE:
        case ADMIN_EDIT_COMPANY_ADDRESS_SUCCESS:
        case ADMIN_EDIT_COMPANY_ADDRESS_FAILURE:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_SUCCESS:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_FAILURE:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_SUCCESS:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_FAILURE:
        case ENABLE_COMPANY_SUCCESS:
        case ENABLE_COMPANY_FAILURE:
        case DISABLE_COMPANY_SUCCESS:
        case DISABLE_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function filtersReducer(
    state = { name: '', companyType: COMPANY_TYPES.ALL, serviceIDs: [] },
    action,
) {
    switch (action.type) {
        case UPDATE_COMPANIES_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_REQUEST:
        case FETCH_SINGLE_COMPANY_REQUEST:
        case FETCH_SINGLE_COMPANY_FOR_INVOICE_REQUEST:
        case SA_TOGGLE_COMPANY_ON_CLIENT_LIST_REQUEST:
        case ADMIN_EDIT_COMPANY_ADDRESS_REQUEST:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_REQUEST:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_REQUEST:
        case ENABLE_COMPANY_REQUEST:
        case DISABLE_COMPANY_REQUEST:
            return null;
        case FETCH_ALL_COMPANIES_FAILURE:
        case FETCH_SINGLE_COMPANY_FAILURE:
        case SA_TOGGLE_COMPANY_ON_CLIENT_LIST_FAILURE:
        case FETCH_COMPANY_PIN_OPTION_TYPES_FAILURE:
        case ADMIN_EDIT_COMPANY_ADDRESS_FAILURE:
        case FETCH_SINGLE_COMPANY_FOR_INVOICE_FAILURE:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_FAILURE:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_FAILURE:
        case ENABLE_COMPANY_FAILURE:
        case DISABLE_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_COMPANIES_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_COMPANY_SUCCESS:
        case SA_TOGGLE_COMPANY_ON_CLIENT_LIST_SUCCESS:
        case ADMIN_EDIT_COMPANY_ADDRESS_SUCCESS:
        case ADMIN_EDIT_COMPANY_FREE_CREDIT_SUCCESS:
        case ADMIN_EDIT_COMPANY_JOB_REF_DROPDOWN_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);

        case ENABLE_COMPANY_REQUEST:
        case DISABLE_COMPANY_REQUEST:
            return updateObj(state, action.payload.id, {
                ...action.payload,
                isDisabled: !action.payload.isDisabled,
            });
        default:
            return state;
    }
}

function singleCompanyReducer(state = {}, action) {
    switch (action.type) {
        case ENABLE_COMPANY_SUCCESS:
        case DISABLE_COMPANY_SUCCESS:
        case ENABLE_COMPANY_FAILURE:
        case DISABLE_COMPANY_FAILURE:
            return updateObj(state, action.payload.id, action.payload);
        case FETCH_SINGLE_COMPANY_FOR_INVOICE_SUCCESS:
            return action.payload;
        case ENABLE_COMPANY_REQUEST:
        case DISABLE_COMPANY_REQUEST:
            return updateObj(state, action.payload.id, {
                ...action.payload,
                isDisabled: !action.payload.isDisabled,
            });
        default:
            return state;
    }
}
