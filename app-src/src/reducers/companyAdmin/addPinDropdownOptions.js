import { combineReducers } from 'redux';

import {
    FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST,
    FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE,
    UPDATE_DRAWING_DROPDOWN_OPTIONS,
} from 'constants/actionTypes/drawings';
import { FETCH_ALL_OPTION_VALUES_REQUEST } from 'constants/actionTypes/companyAdminManufacturers';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    areManufacturerOptionsIncluded: areManufacturerOptionsIncludedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST:
            return true;
        case FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE:
        case FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE:
            return action.error;
        case FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST:
            return null;
        default:
            return state;
    }
}

function dropdownOptionsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS:
            return action.payload;
        case UPDATE_DRAWING_DROPDOWN_OPTIONS:
            return action.options;
        default:
            return state;
    }
}

function areManufacturerOptionsIncludedReducer(state = [], action) {
    switch (action.type) {
        case FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST:
        case FETCH_ALL_OPTION_VALUES_REQUEST:
            return false;
        case UPDATE_DRAWING_DROPDOWN_OPTIONS:
            return true;
        default:
            return state;
    }
}
