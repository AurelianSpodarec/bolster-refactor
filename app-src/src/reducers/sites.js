import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_ALL_SITES_REQUEST,
    FETCH_ALL_SITES_SUCCESS,
    FETCH_ALL_SITES_FAILURE,
    FETCH_SINGLE_SITE_REQUEST,
    FETCH_SINGLE_SITE_SUCCESS,
    FETCH_SINGLE_SITE_FAILURE,
    UPDATE_SITES_FILTERS
} from 'constants/actionTypes/sites';

export default combineReducers({
    sites: sitesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    filters: filtersReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_SITES_REQUEST:
        case FETCH_SINGLE_SITE_REQUEST:
            return true;
        case FETCH_ALL_SITES_SUCCESS:
        case FETCH_ALL_SITES_FAILURE:
        case FETCH_SINGLE_SITE_SUCCESS:
        case FETCH_SINGLE_SITE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_SITES_REQUEST:
        case FETCH_SINGLE_SITE_REQUEST:
            return null;
        case FETCH_ALL_SITES_FAILURE:
        case FETCH_SINGLE_SITE_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function sitesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SITES_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_SITE_SUCCESS:
            return updateObj(
                state,
                action.payload.id.toString(),
                action.payload
            );
        default:
            return state;
    }
}

function filtersReducer(state = { name: '', status: '' }, action) {
    switch (action.type) {
        case UPDATE_SITES_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
