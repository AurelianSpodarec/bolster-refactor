import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    SA_FETCH_PIN_OPTION_MANUFACTURERS_REQUEST,
    SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS,
    SA_FETCH_PIN_OPTION_MANUFACTURERS_FAILURE,
    SA_CREATE_MANUFACTURER_REQUEST,
    SA_CREATE_MANUFACTURER_SUCCESS,
    SA_CREATE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_CREATE_MANUFACTURER_REQUEST:
            return false;
        case SA_CREATE_MANUFACTURER_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = false, action) {
    switch (action.type) {
        case SA_CREATE_MANUFACTURER_REQUEST:
            return false;
        case SA_CREATE_MANUFACTURER_FAILURE:
            return true;
        default:
            return state;
    }
}

function manufacturersReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_PIN_OPTION_MANUFACTURERS_SUCCESS:
            return updateObj(
                state,
                DROPDOWN_OPTIONS[action.pinOptionType].reduxKey,
                convertArrToObj(action.payload),
            );
        case SA_CREATE_MANUFACTURER_SUCCESS:
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
