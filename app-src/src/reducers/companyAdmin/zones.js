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
    SET_ZONES_OPACITY,
    DELETE_DRAWING_ZONE_REQUEST,
    DELETE_DRAWING_ZONE_SUCCESS,
    EDIT_DRAWING_ZONE_REQUEST,
    EDIT_DRAWING_ZONE_SUCCESS,
} from 'constants/actionTypes/zones';
import { convertArrToObj, removeObjItem } from 'helpers/generic';
import { FETCH_ALL_APPROVED_COMPANIES_FAILURE } from 'constants/actionTypes/approvedCompanies';
import { DELETE_BUILDING_FAILURE } from 'constants/actionTypes/buildings';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    isAddMode: isAddModeReducer,
    zonesOpacity: zonesOpacityReducer,
    zones: zonesReducer,
    zoneFormCoordinates: zonesFormCoordinatesReducer,
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
        case DELETE_DRAWING_ZONE_REQUEST:
        case EDIT_DRAWING_ZONE_REQUEST:
            return null;
        case CREATE_DRAWING_ZONE_FAILURE:
        case FETCH_ALL_APPROVED_COMPANIES_FAILURE:
        case DELETE_BUILDING_FAILURE:
        case EDIT_DRAWING_ZONE_SUCCESS:
            return action.error;
        default:
            return state;
    }
}

function zonesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DRAWING_ZONES_SUCCESS: {
            return convertArrToObj(action.payload.map(formatZone));
        }
        case CREATE_DRAWING_ZONE_SUCCESS:
        case EDIT_DRAWING_ZONE_SUCCESS:
            return {
                ...state,
                [action.payload.id]: formatZone(action.payload),
            };
        case DELETE_DRAWING_ZONE_SUCCESS:
            return removeObjItem(state, action.zoneID);
        default:
            return state;
    }
}

function formatZone({ coordinates, ...zone }) {
    return { ...zone, coordinates: JSON.parse(coordinates) };
}
