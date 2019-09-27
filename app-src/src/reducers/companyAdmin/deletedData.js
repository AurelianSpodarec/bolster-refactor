import { combineReducers } from 'redux';

import { convertArrToObj, removeObjItem } from 'helpers/generic';
import {
    RESTORE_DRAWING_REQUEST,
    RESTORE_DRAWING_SUCCESS,
    RESTORE_DRAWING_FAILURE,
    RESTORE_FLOOR_REQUEST,
    RESTORE_FLOOR_SUCCESS,
    RESTORE_FLOOR_FAILURE,
    RESTORE_BUILDING_REQUEST,
    RESTORE_BUILDING_SUCCESS,
    RESTORE_BUILDING_FAILURE,
    RESTORE_SITE_REQUEST,
    RESTORE_SITE_SUCCESS,
    RESTORE_SITE_FAILURE,
    RESTORE_OPERATIVE_REQUEST,
    RESTORE_OPERATIVE_SUCCESS,
    RESTORE_OPERATIVE_FAILURE,
    RESTORE_PIN_HISTORY_REQUEST,
    RESTORE_PIN_HISTORY_SUCCESS,
    RESTORE_PIN_HISTORY_FAILURE,
    FETCH_RECENTLY_DELETED_REQUEST,
    FETCH_RECENTLY_DELETED_SUCCESS,
    FETCH_RECENTLY_DELETED_FAILURE
} from 'constants/actionTypes/deletedData';

export default combineReducers({
    drawings: drawingsReducer,
    floors: floorsReducer,
    buildings: buildingsReducer,
    sites: sitesReducer,
    operatives: operativesReducer,
    pinHistories: pinHistoriesReducer,
    isFetchingData: isFetchingDataReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    postError: postErrorReducer
});

function isFetchingDataReducer(state = false, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return true;
        case FETCH_RECENTLY_DELETED_SUCCESS:
        case FETCH_RECENTLY_DELETED_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_FLOOR_REQUEST:
        case RESTORE_BUILDING_REQUEST:
        case RESTORE_SITE_REQUEST:
        case RESTORE_OPERATIVE_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return true;
        case RESTORE_DRAWING_SUCCESS:
        case RESTORE_DRAWING_FAILURE:
        case RESTORE_FLOOR_SUCCESS:
        case RESTORE_FLOOR_FAILURE:
        case RESTORE_BUILDING_SUCCESS:
        case RESTORE_BUILDING_FAILURE:
        case RESTORE_SITE_SUCCESS:
        case RESTORE_SITE_FAILURE:
        case RESTORE_OPERATIVE_SUCCESS:
        case RESTORE_OPERATIVE_FAILURE:
        case RESTORE_PIN_HISTORY_SUCCESS:
        case RESTORE_PIN_HISTORY_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_FLOOR_REQUEST:
        case RESTORE_BUILDING_REQUEST:
        case RESTORE_SITE_REQUEST:
        case RESTORE_OPERATIVE_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return false;
        case RESTORE_DRAWING_SUCCESS:
        case RESTORE_FLOOR_SUCCESS:
        case RESTORE_BUILDING_SUCCESS:
        case RESTORE_SITE_SUCCESS:
        case RESTORE_OPERATIVE_SUCCESS:
        case RESTORE_PIN_HISTORY_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_FLOOR_REQUEST:
        case RESTORE_BUILDING_REQUEST:
        case RESTORE_SITE_REQUEST:
        case RESTORE_OPERATIVE_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return false;
        case RESTORE_DRAWING_FAILURE:
        case RESTORE_FLOOR_FAILURE:
        case RESTORE_BUILDING_FAILURE:
        case RESTORE_SITE_FAILURE:
        case RESTORE_OPERATIVE_FAILURE:
        case RESTORE_PIN_HISTORY_FAILURE:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return null;
        case FETCH_RECENTLY_DELETED_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case RESTORE_DRAWING_REQUEST:
        case RESTORE_FLOOR_REQUEST:
        case RESTORE_BUILDING_REQUEST:
        case RESTORE_SITE_REQUEST:
        case RESTORE_OPERATIVE_REQUEST:
        case RESTORE_PIN_HISTORY_REQUEST:
            return null;
        case RESTORE_DRAWING_FAILURE:
        case RESTORE_FLOOR_FAILURE:
        case RESTORE_BUILDING_FAILURE:
        case RESTORE_SITE_FAILURE:
        case RESTORE_OPERATIVE_FAILURE:
        case RESTORE_PIN_HISTORY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return convertArrToObj(action.payload.drawings);
        case RESTORE_DRAWING_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function floorsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return convertArrToObj(action.payload.floors);
        case RESTORE_FLOOR_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function buildingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return convertArrToObj(action.payload.buildings);
        case RESTORE_BUILDING_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function sitesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return convertArrToObj(action.payload.sites);
        case RESTORE_SITE_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function operativesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return convertArrToObj(action.payload.operatives);
        case RESTORE_OPERATIVE_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}

function pinHistoriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENTLY_DELETED_REQUEST:
            return {};
        case FETCH_RECENTLY_DELETED_SUCCESS:
            return convertArrToObj(action.payload.pinHistories);
        case RESTORE_PIN_HISTORY_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
