import { combineReducers } from 'redux';

import {
    FETCH_ALL_WORKING_HOURS_REQUEST,
    FETCH_ALL_WORKING_HOURS_FAILURE,
    FETCH_ALL_WORKING_HOURS_SUCCESS,
} from 'constants/actionTypes/workingHours';
import { convertArrToObj } from '../../helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    workingHours: workingHoursReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_WORKING_HOURS_REQUEST:
            return true;
        case FETCH_ALL_WORKING_HOURS_FAILURE:
        case FETCH_ALL_WORKING_HOURS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_WORKING_HOURS_REQUEST:
        case FETCH_ALL_WORKING_HOURS_SUCCESS:
            return null;
        case FETCH_ALL_WORKING_HOURS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function workingHoursReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_WORKING_HOURS_REQUEST:
        case FETCH_ALL_WORKING_HOURS_FAILURE:
            return state;
        case FETCH_ALL_WORKING_HOURS_SUCCESS:
            return convertArrToObj(action.payload, 'companyUserID');
        default:
            return state;
    }
}
