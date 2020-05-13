import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
    SA_CREATE_OPTION_VALUE_REQUEST,
    SA_CREATE_OPTION_VALUE_SUCCESS,
    SA_CREATE_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';

export default combineReducers({
    manufacturersOptionValues: manufacturersOptionValuesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST:
            return true;
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS:
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST:
            return null;
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case SA_CREATE_OPTION_VALUE_REQUEST:
            // case SA_EDIT_OPTION_VALUE_REQUEST:
            return false;
        case SA_CREATE_OPTION_VALUE_SUCCESS:
            // case SA_EDIT_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = false, action) {
    switch (action.type) {
        case SA_CREATE_OPTION_VALUE_REQUEST:
            // case SA_EDIT_OPTION_VALUE_REQUEST:
            return false;
        case SA_CREATE_OPTION_VALUE_FAILURE:
            // case SA_EDIT_OPTION_VALUE_FAILURE:
            return true;
        default:
            return state;
    }
}

function manufacturersOptionValuesReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS:
            return updateObj(state, action.manufacturerID, convertArrToObj(action.payload));
        case SA_CREATE_OPTION_VALUE_SUCCESS:
            return {
                ...state,
                [action.manufacturerID]: updateObj(
                    state[action.manufacturerID],
                    action.payload.id,
                    action.payload,
                ),
            };
        default:
            return state;
    }
}
