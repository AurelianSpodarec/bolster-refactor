import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_ALL_BUILDINGS_REQUEST,
    FETCH_ALL_BUILDINGS_SUCCESS,
    FETCH_ALL_BUILDINGS_FAILURE,
    FETCH_SINGLE_BUILDING_REQUEST,
    FETCH_SINGLE_BUILDING_SUCCESS,
    FETCH_SINGLE_BUILDING_FAILURE,
    UPDATE_BUILDINGS_SEARCH_TERM,
    SET_BUILDINGS_FILTER_STATUS
} from 'constants/actionTypes/buildings';

export default combineReducers({
    buildings: buildingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    nameFilter: nameFilterReducer,
    stausFilter: statusFilterReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_REQUEST:
            return true;
        case FETCH_ALL_BUILDINGS_SUCCESS:
        case FETCH_ALL_BUILDINGS_FAILURE:
        case FETCH_SINGLE_BUILDING_SUCCESS:
        case FETCH_SINGLE_BUILDING_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_REQUEST:
            return null;
        case FETCH_ALL_BUILDINGS_FAILURE:
        case FETCH_SINGLE_BUILDING_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function buildingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_BUILDING_REQUEST:
            return updateObj(
                state,
                action.payload.id.toString(),
                action.payload
            );
        default:
            return state;
    }
}

function nameFilterReducer(state = '', action) {
    switch (action.type) {
        case UPDATE_BUILDINGS_SEARCH_TERM:
            return action.searchTerm;
        default:
            return state;
    }
}

function statusFilterReducer(state = '', action) {
    switch (action.type) {
        case SET_BUILDINGS_FILTER_STATUS:
            return action.searchTerm;
        default:
            return state;
    }
}
