import { combineReducers } from 'redux';
import {
    CLIENT_FETCH_ALL_BUILDINGS_REQUEST,
    CLIENT_FETCH_SINGLE_BUILDING_REQUEST,
    CLIENT_FETCH_ALL_BUILDINGS_FAILURE,
    CLIENT_FETCH_ALL_BUILDINGS_SUCCESS,
    CLIENT_FETCH_SINGLE_BUILDING_SUCCESS,
    CLIENT_FETCH_SINGLE_BUILDING_FAILURE
} from 'constants/client/actionTypes/clientBuildings';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    buildings: buildingsReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_BUILDINGS_REQUEST:
        case CLIENT_FETCH_SINGLE_BUILDING_REQUEST:
            return true;
        case CLIENT_FETCH_ALL_BUILDINGS_FAILURE:
        case CLIENT_FETCH_ALL_BUILDINGS_SUCCESS:
        case CLIENT_FETCH_SINGLE_BUILDING_SUCCESS:
        case CLIENT_FETCH_SINGLE_BUILDING_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_BUILDINGS_REQUEST:
        case CLIENT_FETCH_SINGLE_BUILDING_REQUEST:
            return null;
        case CLIENT_FETCH_ALL_BUILDINGS_FAILURE:
        case CLIENT_FETCH_SINGLE_BUILDING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function buildingsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_BUILDINGS_REQUEST:
            return {};
        case CLIENT_FETCH_ALL_BUILDINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case CLIENT_FETCH_SINGLE_BUILDING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
