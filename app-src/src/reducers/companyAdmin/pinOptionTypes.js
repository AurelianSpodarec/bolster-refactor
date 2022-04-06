import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_TYPES_REQUEST,
    FETCH_PIN_OPTION_TYPES_SUCCESS,
    FETCH_PIN_OPTION_TYPES_FAILURE,
    SET_PIN_OPTIONS_TYPES_SELECTED_TAB_ID,
} from 'constants/actionTypes/pinOptions';
import { PIN_OPTION_TYPES_VALS } from 'constants/companyAdmin/enums';

export default combineReducers({
    types: typesReducer,
    isFetching: isFetchingReducer,
    fetchError: fetchErrorReducer,
    selectedTabID: selectedTabIDReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_TYPES_REQUEST:
            return true;
        case FETCH_PIN_OPTION_TYPES_SUCCESS:
        case FETCH_PIN_OPTION_TYPES_FAILURE:
            return false;
        default:
            return state;
    }
}

function fetchErrorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_TYPES_REQUEST:
            return null;
        case FETCH_PIN_OPTION_TYPES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function typesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_TYPES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function selectedTabIDReducer(state = PIN_OPTION_TYPES_VALS.installationTypes, action) {
    switch (action.type) {
        case SET_PIN_OPTIONS_TYPES_SELECTED_TAB_ID:
            return action.id;
        default:
            return state;
    }
}
