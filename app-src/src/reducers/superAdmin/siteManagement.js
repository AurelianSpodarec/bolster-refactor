import { combineReducers } from 'redux';

import {
    ADMIN_SITE_MANAGEMENT_SELECT_HIERARCHY,
    ADMIN_SITE_MANAGEMENT_SELECT_OPTION,
    ADMIN_MOVE_BUILDING_REQUEST,
    ADMIN_MOVE_BUILDING_SUCCESS,
    ADMIN_MOVE_BUILDING_FAILURE,
    ADMIN_MOVE_FLOOR_REQUEST,
    ADMIN_MOVE_FLOOR_SUCCESS,
    ADMIN_MOVE_FLOOR_FAILURE,
    ADMIN_MOVE_DRAWING_REQUEST,
    ADMIN_MOVE_DRAWING_SUCCESS,
    ADMIN_MOVE_DRAWING_FAILURE
} from 'constants/actionTypes/siteManagement';

export default combineReducers({
    selectedHierarchy: selectedHierarchyReducer,
    selectedOption: selectedOptionReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function selectedHierarchyReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_SITE_MANAGEMENT_SELECT_HIERARCHY:
            return action.value;
        default:
            return state;
    }
}

function selectedOptionReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_SITE_MANAGEMENT_SELECT_OPTION:
            return action.value;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_MOVE_BUILDING_REQUEST:
        case ADMIN_MOVE_FLOOR_REQUEST:
        case ADMIN_MOVE_DRAWING_REQUEST:
            return true;
        case ADMIN_MOVE_BUILDING_SUCCESS:
        case ADMIN_MOVE_BUILDING_FAILURE:
        case ADMIN_MOVE_FLOOR_SUCCESS:
        case ADMIN_MOVE_FLOOR_FAILURE:
        case ADMIN_MOVE_DRAWING_SUCCESS:
        case ADMIN_MOVE_DRAWING_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_MOVE_BUILDING_REQUEST:
        case ADMIN_MOVE_FLOOR_REQUEST:
        case ADMIN_MOVE_DRAWING_REQUEST:
            return false;
        case ADMIN_MOVE_BUILDING_SUCCESS:
        case ADMIN_MOVE_FLOOR_SUCCESS:
        case ADMIN_MOVE_DRAWING_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_MOVE_BUILDING_REQUEST:
        case ADMIN_MOVE_FLOOR_REQUEST:
        case ADMIN_MOVE_DRAWING_REQUEST:
            return false;
        case ADMIN_MOVE_BUILDING_FAILURE:
        case ADMIN_MOVE_FLOOR_FAILURE:
        case ADMIN_MOVE_DRAWING_FAILURE:
            return action.error;
        default:
            return state;
    }
}
