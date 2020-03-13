import { combineReducers } from 'redux';
import {
    CREATE_DRAWING_ZONE_FAILURE,
    CREATE_DRAWING_ZONE_REQUEST,
    CREATE_DRAWING_ZONE_SUCCESS,
    FETCH_DRAWING_ZONES_REQUEST,
    FETCH_DRAWING_ZONES_SUCCESS,
    FETCH_DRAWING_ZONES_FAILURE,
    SET_ZONE_ADD_MODE,
    SET_ZONE_FORM_COORDINATES,
    SET_ZONES_OPACITY
} from 'constants/actionTypes/zones';
import { convertArrToObj } from 'helpers/generic';
import { FETCH_ALL_APPROVED_COMPANIES_FAILURE } from 'constants/actionTypes/approvedCompanies';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    isAddMode: isAddModeReducer,
    zonesOpacity: zonesOpacityReducer,
    zones: zonesReducer,
    zoneFormCoordinates: zonesFormCoordinatesReducer
});

function zonesFormCoordinatesReducer(state = null, action) {
    switch (action.type) {
        case SET_ZONE_FORM_COORDINATES:
            return action.coordinates;
        default:
            return state;
    }
}

function zonesOpacityReducer(state = 0.3, action) {
    switch (action.type) {
        case SET_ZONES_OPACITY:
            return action.value;
        default:
            return state;
    }
}

function isAddModeReducer(state = false, action) {
    switch (action.type) {
        case SET_ZONE_ADD_MODE:
            return action.value;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_ZONES_REQUEST:
            return true;
        case FETCH_DRAWING_ZONES_SUCCESS:
        case FETCH_DRAWING_ZONES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_DRAWING_ZONE_REQUEST:
        case FETCH_DRAWING_ZONES_REQUEST:
            return null;
        case CREATE_DRAWING_ZONE_FAILURE:
        case FETCH_ALL_APPROVED_COMPANIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function zonesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DRAWING_ZONES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case CREATE_DRAWING_ZONE_SUCCESS:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}
