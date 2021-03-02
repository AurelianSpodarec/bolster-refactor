import { combineReducers } from 'redux';

import {
    CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_REQUEST,
    CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_SUCCESS,
    CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_FAILURE,
} from 'constants/client/actionTypes/clientManufacturers';
import { formatAllOptionValuesByManufacturer } from 'helpers/redux';

export default combineReducers({
    manufacturersOptionValues: manufacturersOptionValuesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_REQUEST:
            return true;
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_SUCCESS:
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_REQUEST:
            return null;
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function manufacturersOptionValuesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_REQUEST:
            return {};
        case CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_SUCCESS:
            return formatAllOptionValuesByManufacturer(action.payload);
        default:
            return state;
    }
}
