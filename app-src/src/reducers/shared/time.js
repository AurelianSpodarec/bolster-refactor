import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';

import {
    FETCH_TIMEZONES_REQUEST,
    FETCH_TIMEZONES_SUCCESS,
    FETCH_TIMEZONES_FAILURE,
    FETCH_DATE_FORMATS_REQUEST,
    FETCH_DATE_FORMATS_FAILURE,
    FETCH_DATE_FORMATS_SUCCESS
} from 'constants/actionTypes/time';

export default combineReducers({
    timeZones: timeZonesReducer,
    dateFormats: dateFormatsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_TIMEZONES_REQUEST:
        case FETCH_DATE_FORMATS_REQUEST:
            return true;
        case FETCH_TIMEZONES_SUCCESS:
        case FETCH_TIMEZONES_FAILURE:
        case FETCH_DATE_FORMATS_FAILURE:
        case FETCH_DATE_FORMATS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_TIMEZONES_REQUEST:
        case FETCH_DATE_FORMATS_REQUEST:
            return null;
        case FETCH_TIMEZONES_FAILURE:
        case FETCH_DATE_FORMATS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function timeZonesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TIMEZONES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function dateFormatsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DATE_FORMATS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
