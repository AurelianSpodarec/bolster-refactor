import { combineReducers } from 'redux';
import { removeArrItem } from 'helpers/generic';
import {
    TOGGLE_SITE_EXPANDED,
    TOGGLE_BUILDING_EXPANDED,
    TOGGLE_FLOOR_EXPANDED,
    TOGGLE_DRAWING_EXPANDED
} from 'constants/actionTypes/generic';

export default combineReducers({
    expandedSiteIds: expandedSitesReducer,
    expandedBuildingIds: expandedBuildingsReducer,
    expandedFloorIds: expandedFloorsReducer,
    expandedDrawingIds: expandedDrawingsReducer
});

function expandedSitesReducer(state = [], action) {
    switch (action.type) {
        case TOGGLE_SITE_EXPANDED:
            return toggleItem(state, action.id);
        default:
            return state;
    }
}

function expandedBuildingsReducer(state = [], action) {
    switch (action.type) {
        case TOGGLE_BUILDING_EXPANDED:
            return toggleItem(state, action.id);
        default:
            return state;
    }
}

function expandedFloorsReducer(state = [], action) {
    switch (action.type) {
        case TOGGLE_FLOOR_EXPANDED:
            return toggleItem(state, action.id);
        default:
            return state;
    }
}

function expandedDrawingsReducer(state = [], action) {
    switch (action.type) {
        case TOGGLE_DRAWING_EXPANDED:
            return toggleItem(state, action.id);
        default:
            return state;
    }
}

function toggleItem(arr, item) {
    const index = arr.indexOf(item);
    return index === -1 ? [...arr, item] : removeArrItem(arr, index);
}
