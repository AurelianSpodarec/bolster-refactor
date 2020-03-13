import { combineReducers } from 'redux';
import {
    CREATE_DRAWING_ZONE_FAILURE,
    CREATE_DRAWING_ZONE_REQUEST,
    CREATE_DRAWING_ZONE_SUCCESS,
    SET_ZONE_ADD_MODE,
    SET_ZONE_FORM_FIELD,
    SET_ZONES_OPACITY
} from 'constants/actionTypes/zones';
import { CREATE_BUILDINGS_FAILURE } from 'constants/actionTypes/buildings';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    isAddMode: isAddModeReducer,
    zonesOpacity: zonesOpacityReducer,
    zones: zonesReducer,
    zoneFormData: zonesFormDataReducer
});

function zonesFormDataReducer(
    state = {
        name: '',
        colorHex: '',
        coords: null
    },
    action
) {
    switch (action.type) {
        case SET_ZONE_FORM_FIELD:
            return { ...state, [action.field]: action.value };
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
    // switch (action.type) {
    //     case FETCH_PIN_STATS_REQUEST:
    //         return true;
    //     case FETCH_PIN_STATS_SUCCESS:
    //     case FETCH_PIN_STATS_FAILURE:
    //         return false;
    //     default:
    //         return state;
    // }

    return state;
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_DRAWING_ZONE_REQUEST:
            return null;
        case CREATE_DRAWING_ZONE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function zonesReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_DRAWING_ZONE_SUCCESS:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}
