import { combineReducers } from 'redux';
import {
    CLIENT_FETCH_ALL_SITES_REQUEST,
    CLIENT_FETCH_SINGLE_SITE_REQUEST,
    CLIENT_FETCH_ALL_SITES_FAILURE,
    CLIENT_FETCH_ALL_SITES_SUCCESS,
    CLIENT_FETCH_SINGLE_SITE_FAILURE,
    CLIENT_FETCH_SINGLE_SITE_SUCCESS
} from 'constants/client/actionTypes/clientSites';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    sites: sitesReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_SITES_REQUEST:
        case CLIENT_FETCH_SINGLE_SITE_REQUEST:
            return true;
        case CLIENT_FETCH_ALL_SITES_FAILURE:
        case CLIENT_FETCH_ALL_SITES_SUCCESS:
        case CLIENT_FETCH_SINGLE_SITE_FAILURE:
        case CLIENT_FETCH_SINGLE_SITE_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_SITES_REQUEST:
        case CLIENT_FETCH_SINGLE_SITE_REQUEST:
            return null;
        case CLIENT_FETCH_ALL_SITES_FAILURE:
        case CLIENT_FETCH_SINGLE_SITE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function sitesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_SITES_SUCCESS:
            return convertArrToObj(action.payload);
        case CLIENT_FETCH_SINGLE_SITE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
