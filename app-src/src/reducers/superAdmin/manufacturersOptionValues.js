import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

export default combineReducers({
    manufacturersOptionValues: manufacturersOptionValuesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
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

function manufacturersOptionValuesReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS:
            return updateObj(state, action.manufacturerID, convertArrToObj(action.payload));
        default:
            return state;
    }
}
