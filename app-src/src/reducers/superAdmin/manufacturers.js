import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    SA_FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
    SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    SA_FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';

export default combineReducers({
    manufacturers: manufacturersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_REQUEST:
            return true;
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS:
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_REQUEST:
            return null;
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function manufacturersReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS:
            return { ...state, [action.pinOptionType]: convertArrToObj(action.payload) };
        default:
            return state;
    }
}
