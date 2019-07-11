import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, moveItem } from 'helpers/generic';
import {
    FETCH_ALL_DRAWINGS_REQUEST,
    FETCH_ALL_DRAWINGS_SUCCESS,
    FETCH_ALL_DRAWINGS_FAILURE,
    FETCH_SINGLE_DRAWING_REQUEST,
    FETCH_SINGLE_DRAWING_SUCCESS,
    FETCH_SINGLE_DRAWING_FAILURE,
    CREATE_DRAWING_REQUEST,
    CREATE_DRAWING_SUCCESS,
    CREATE_DRAWING_FAILURE,
    DELETE_DRAWING_REQUEST,
    DELETE_DRAWING_SUCCESS,
    DELETE_DRAWING_FAILURE,
    ARCHIVE_DRAWING_REQUEST,
    ARCHIVE_DRAWING_SUCCESS,
    ARCHIVE_DRAWING_FAILURE,
    EDIT_DRAWING_REQUEST,
    EDIT_DRAWING_SUCCESS,
    EDIT_DRAWING_FAILURE,
    UPDATE_FLOOR_PLAN_CONFIRMED,
    REORDER_DRAWING,
    CREATE_DRAWINGS_SUCCESS,
    CREATE_DRAWINGS_REQUEST,
    CREATE_DRAWINGS_FAILURE
} from 'constants/actionTypes/drawings';

import {
    ADD_CREDITS_TO_DRAWING_REQUEST,
    ADD_CREDITS_TO_DRAWING_SUCCESS,
    ADD_CREDITS_TO_DRAWING_FAILURE
} from 'constants/actionTypes/credits';

export default combineReducers({
    drawings: drawingsReducer,
    isFetching: isFetchingReducer,
    updatedID: updatedIDReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    deleteSuccess: deleteSuccessReducer,
    updatingFloorPlan: updatingFloorPlanReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_REQUEST:
        case FETCH_SINGLE_DRAWING_REQUEST:
            return true;
        case FETCH_ALL_DRAWINGS_SUCCESS:
        case FETCH_ALL_DRAWINGS_FAILURE:
        case FETCH_SINGLE_DRAWING_SUCCESS:
        case FETCH_SINGLE_DRAWING_FAILURE:
            return false;
        default:
            return state;
    }
}

function updatedIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_DRAWING_REQUEST:
        case CREATE_DRAWINGS_SUCCESS:
            return 0;
        case CREATE_DRAWING_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_REQUEST:
        case FETCH_SINGLE_DRAWING_REQUEST:
        case CREATE_DRAWING_REQUEST:
        case CREATE_DRAWINGS_REQUEST:
        case DELETE_DRAWING_REQUEST:
        case ARCHIVE_DRAWING_REQUEST:
        case EDIT_DRAWING_REQUEST:
            return null;
        case FETCH_ALL_DRAWINGS_FAILURE:
        case FETCH_SINGLE_DRAWING_FAILURE:
        case CREATE_DRAWING_FAILURE:
        case CREATE_DRAWINGS_FAILURE:
        case DELETE_DRAWING_FAILURE:
        case ARCHIVE_DRAWING_FAILURE:
        case EDIT_DRAWING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_DRAWING_REQUEST:
        case CREATE_DRAWINGS_REQUEST:
        case ARCHIVE_DRAWING_REQUEST:
        case EDIT_DRAWING_REQUEST:
        case ADD_CREDITS_TO_DRAWING_REQUEST:
            return false;
        case CREATE_DRAWING_SUCCESS:
        case CREATE_DRAWINGS_SUCCESS:
        case ARCHIVE_DRAWING_SUCCESS:
        case EDIT_DRAWING_SUCCESS:
        case ADD_CREDITS_TO_DRAWING_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case DELETE_DRAWING_REQUEST:
        case ARCHIVE_DRAWING_REQUEST:
            return false;
        case DELETE_DRAWING_FAILURE:
        case ARCHIVE_DRAWING_FAILURE:
            return true;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_DRAWING_REQUEST:
            return false;
        case DELETE_DRAWING_SUCCESS:
            return true;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_REQUEST:
            return {};
        case FETCH_ALL_DRAWINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_DRAWING_SUCCESS:
        case CREATE_DRAWING_SUCCESS:
        case ARCHIVE_DRAWING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case REORDER_DRAWING: {
            const sorted = moveItem(
                Object.values(state),
                action.id,
                action.hoverIndex
            );
            return convertArrToObj(sorted);
        }
        default:
            return state;
    }
}

function updatingFloorPlanReducer(state = false, action) {
    switch (action.type) {
        case EDIT_DRAWING_REQUEST:
            return true;
        case UPDATE_FLOOR_PLAN_CONFIRMED:
            return false;
        default:
            return state;
    }
}
