import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';

import {
    FETCH_DRAWING_DROPDOWN_OPTIONS_REQUEST,
    FETCH_DRAWING_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_DRAWING_DROPDOWN_OPTIONS_FAILURE
} from 'constants/actionTypes/drawings';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
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
        default:
            return state;
    }
}
