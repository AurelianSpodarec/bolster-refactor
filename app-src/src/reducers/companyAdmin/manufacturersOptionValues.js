import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
    FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
    CREATE_OPTION_VALUE_REQUEST,
    CREATE_OPTION_VALUE_SUCCESS,
    CREATE_OPTION_VALUE_FAILURE,
    EDIT_OPTION_VALUE_REQUEST,
    EDIT_OPTION_VALUE_SUCCESS,
    EDIT_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export default combineReducers({
    manufacturersOptionValues: manufacturersOptionValuesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST:
            return true;
        case FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS:
        case FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST:
            return null;
        case FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_OPTION_VALUE_REQUEST:
        case EDIT_OPTION_VALUE_REQUEST:
            return false;
        case CREATE_OPTION_VALUE_SUCCESS:
        case EDIT_OPTION_VALUE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = false, action) {
    switch (action.type) {
        case CREATE_OPTION_VALUE_REQUEST:
        case EDIT_OPTION_VALUE_REQUEST:
            return false;
        case CREATE_OPTION_VALUE_FAILURE:
        case EDIT_OPTION_VALUE_FAILURE:
            return true;
        default:
            return state;
    }
}

function manufacturersOptionValuesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS:
            return updateObj(state, action.manufacturerID, convertArrToObj(action.payload));
        case CREATE_OPTION_VALUE_SUCCESS:
        case EDIT_OPTION_VALUE_SUCCESS:
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
