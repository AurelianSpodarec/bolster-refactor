import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_BUILDINGS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_BUILDINGS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_BUILDINGS_FOR_COMPANY_FAILURE
} from 'constants/actionTypes/companies';

import { ADMIN_MOVE_BUILDING_SUCCESS } from 'constants/actionTypes/siteManagement';

import { convertArrToObj, removeObjItem } from 'helpers/generic';

export default combineReducers({
    buildings: buildingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_BUILDINGS_FOR_COMPANY_REQUEST:
            return true;
        case ADMIN_FETCH_BUILDINGS_FOR_COMPANY_SUCCESS:
        case ADMIN_FETCH_BUILDINGS_FOR_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_BUILDINGS_FOR_COMPANY_REQUEST:
            return null;
        case ADMIN_FETCH_BUILDINGS_FOR_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function buildingsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_BUILDINGS_FOR_COMPANY_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case ADMIN_MOVE_BUILDING_SUCCESS:
            return removeObjItem(state, action.buildingID);
        default:
            return state;
    }
}
