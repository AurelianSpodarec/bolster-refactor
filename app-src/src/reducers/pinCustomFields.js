import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_CUSTOM_FIELDS_REQUEST,
    FETCH_CUSTOM_FIELDS_SUCCESS,
    FETCH_CUSTOM_FIELDS_FAILURE
} from 'constants/actionTypes/pins';

export default combineReducers({
    pinCustomFields: pinCustomFieldsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_CUSTOM_FIELDS_REQUEST:
            return true;
        case FETCH_CUSTOM_FIELDS_SUCCESS:
        case FETCH_CUSTOM_FIELDS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_CUSTOM_FIELDS_REQUEST:
            return null;
        case FETCH_CUSTOM_FIELDS_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function pinCustomFieldsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CUSTOM_FIELDS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
