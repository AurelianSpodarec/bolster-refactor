import { combineReducers } from 'redux';

import {
    FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST,
    FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE,
    UPDATE_DRAWING_DROPDOWN_OPTIONS,
} from 'constants/actionTypes/drawings';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    dropdownOptionsLookup: dropdownOptionsLookupReducer,
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

function dropdownOptionsLookupReducer(state = [], action) {
    switch (action.type) {
        case FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS:
            return convertArrToObj(action.payload);
        case UPDATE_DRAWING_DROPDOWN_OPTIONS:
            return convertArrToObj(action.options);
        default:
            return state;
    }
}
