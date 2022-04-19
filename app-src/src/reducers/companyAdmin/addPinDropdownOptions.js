import { combineReducers } from 'redux';

import {
    FETCH_DRAWING_PIN_OPTION_TYPES_REQUEST,
    FETCH_DRAWING_PIN_OPTION_TYPES_SUCCESS,
    FETCH_DRAWING_PIN_OPTION_TYPES_FAILURE,
    UPDATE_DRAWING_PIN_OPTION_TYPES,
    SET_SERVICE_ID,
} from 'constants/actionTypes/drawings';
import { FETCH_ALL_OPTION_VALUES_REQUEST } from 'constants/actionTypes/companyAdminManufacturers';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    areManufacturerOptionsIncluded: areManufacturerOptionsIncludedReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    serviceID: serviceIDReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_PIN_OPTION_TYPES_REQUEST:
            return true;
        case FETCH_DRAWING_PIN_OPTION_TYPES_FAILURE:
        case FETCH_DRAWING_PIN_OPTION_TYPES_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DRAWING_PIN_OPTION_TYPES_FAILURE:
            return action.error;
        case FETCH_DRAWING_PIN_OPTION_TYPES_REQUEST:
            return null;
        default:
            return state;
    }
}

function dropdownOptionsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_DRAWING_PIN_OPTION_TYPES_SUCCESS:
            return action.payload;
        case UPDATE_DRAWING_PIN_OPTION_TYPES:
            return action.options;
        default:
            return state;
    }
}

function areManufacturerOptionsIncludedReducer(state = [], action) {
    switch (action.type) {
        case FETCH_DRAWING_PIN_OPTION_TYPES_REQUEST:
        case FETCH_ALL_OPTION_VALUES_REQUEST:
            return false;
        case UPDATE_DRAWING_PIN_OPTION_TYPES:
            return true;
        default:
            return state;
    }
}

function serviceIDReducer(state = '', action) {
    switch (action.type) {
        case SET_SERVICE_ID:
            return action.serviceID;
        default:
            return state;
    }
}
