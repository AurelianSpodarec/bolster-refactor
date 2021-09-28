import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE,
} from 'constants/actionTypes/pins';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    pins: pinsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST:
            return true;
        case ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS:
        case ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST:
            return null;
        case ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST:
            return {};
        case ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
