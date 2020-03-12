import { combineReducers } from 'redux';
import {
    SET_ZONE_ADD_MODE,
    SET_ZONES_OPACITY,
} from 'constants/actionTypes/zones';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    isAddMode: isAddModeReducer,
    zonesOpacity: zonesOpacityReducer,
    zones: zonesReducer,
});

function zonesOpacityReducer(state = 100, action) {
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
    // switch (action.type) {
    //     case FETCH_PIN_STATS_REQUEST:
    //         return null;

    //     case FETCH_PIN_STATS_FAILURE:
    //         return action.error;
    //     default:
    //         return state;
    // }

    return state;
}

function zonesReducer(state = {}, action) {
    // switch (action.type) {
    //     case FETCH_PIN_STATS_REQUEST:
    //         return {};
    //     case FETCH_PIN_STATS_SUCCESS:
    //         return action.payload;
    //     default:
    //         return state;
    // }

    return state;
}
