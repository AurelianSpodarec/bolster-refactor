import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
    FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
    CREATE_MANUFACTURER_REQUEST,
    CREATE_MANUFACTURER_SUCCESS,
    CREATE_MANUFACTURER_FAILURE,
    EDIT_MANUFACTURER_REQUEST,
    EDIT_MANUFACTURER_SUCCESS,
    EDIT_MANUFACTURER_FAILURE,
    FETCH_SINGLE_MANUFACTURER_REQUEST,
    FETCH_SINGLE_MANUFACTURER_SUCCESS,
    FETCH_SINGLE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

export default combineReducers({
    manufacturers: manufacturersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_MANUFACTURERS_REQUEST:
        case FETCH_SINGLE_MANUFACTURER_REQUEST:
            return true;
        case FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS:
        case FETCH_PIN_OPTION_MANUFACTURERS_FAILURE:
        case FETCH_SINGLE_MANUFACTURER_SUCCESS:
        case FETCH_SINGLE_MANUFACTURER_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_MANUFACTURERS_REQUEST:
            return null;
        case FETCH_PIN_OPTION_MANUFACTURERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_MANUFACTURER_REQUEST:
        case EDIT_MANUFACTURER_REQUEST:
            return false;
        case CREATE_MANUFACTURER_SUCCESS:
        case EDIT_MANUFACTURER_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = false, action) {
    switch (action.type) {
        case CREATE_MANUFACTURER_REQUEST:
        case EDIT_MANUFACTURER_REQUEST:
            return false;
        case CREATE_MANUFACTURER_FAILURE:
        case EDIT_MANUFACTURER_FAILURE:
            return true;
        default:
            return state;
    }
}

function manufacturersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS:
            return updateObj(
                state,
                DROPDOWN_OPTIONS[action.pinOptionType].reduxKey,
                convertArrToObj(action.payload),
            );
        case CREATE_MANUFACTURER_SUCCESS:
        case EDIT_MANUFACTURER_SUCCESS:
        case FETCH_SINGLE_MANUFACTURER_SUCCESS:
            return {
                ...state,
                [DROPDOWN_OPTIONS[action.pinOptionType].reduxKey]: updateObj(
                    state[DROPDOWN_OPTIONS[action.pinOptionType].reduxKey],
                    action.payload.id,
                    action.payload,
                ),
            };
        default:
            return state;
    }
}
