import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, moveItem } from 'helpers/generic';
import {
    FETCH_ALL_FLOORS_REQUEST,
    FETCH_ALL_FLOORS_SUCCESS,
    FETCH_ALL_FLOORS_FAILURE,
    FETCH_SINGLE_FLOOR_REQUEST,
    FETCH_SINGLE_FLOOR_SUCCESS,
    FETCH_SINGLE_FLOOR_FAILURE,
    CREATE_FLOOR_REQUEST,
    CREATE_FLOOR_SUCCESS,
    CREATE_FLOOR_FAILURE,
    EDIT_FLOOR_REQUEST,
    EDIT_FLOOR_SUCCESS,
    EDIT_FLOOR_FAILURE,
    DELETE_FLOOR_REQUEST,
    DELETE_FLOOR_SUCCESS,
    DELETE_FLOOR_FAILURE,
    ARCHIVE_FLOOR_REQUEST,
    ARCHIVE_FLOOR_SUCCESS,
    ARCHIVE_FLOOR_FAILURE,
    REORDER_FLOORS,
    CREATE_FLOORS_REQUEST,
    CREATE_FLOORS_SUCCESS,
    CREATE_FLOORS_FAILURE
} from 'constants/actionTypes/floors';

import { CREATE_DRAWING_SUCCESS } from 'constants/actionTypes/drawings';

export default combineReducers({
    floors: floorsReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    deleteSuccess: deleteSuccessReducer,
    postFailure: postFailureReducer,
    error: errorReducer,
    updatedFloorID: updatedFloorIDReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_FLOORS_REQUEST:
        case FETCH_SINGLE_FLOOR_REQUEST:
        case EDIT_FLOOR_REQUEST:
            return true;
        case FETCH_ALL_FLOORS_SUCCESS:
        case FETCH_SINGLE_FLOOR_SUCCESS:
        case EDIT_FLOOR_SUCCESS:
        case FETCH_ALL_FLOORS_FAILURE:
        case FETCH_SINGLE_FLOOR_FAILURE:
        case EDIT_FLOOR_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_FLOOR_REQUEST:
        case CREATE_FLOORS_REQUEST:
        case EDIT_FLOOR_REQUEST:
        case DELETE_FLOOR_REQUEST:
        case ARCHIVE_FLOOR_REQUEST:
            return false;
        case CREATE_FLOOR_SUCCESS:
        case CREATE_FLOORS_SUCCESS:
        case EDIT_FLOOR_SUCCESS:
        case DELETE_FLOOR_SUCCESS:
        case ARCHIVE_FLOOR_SUCCESS:
            return true;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_FLOOR_REQUEST:
            return false;
        case DELETE_FLOOR_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case CREATE_FLOOR_REQUEST:
        case CREATE_FLOORS_REQUEST:
        case EDIT_FLOOR_REQUEST:
        case DELETE_FLOOR_REQUEST:
        case ARCHIVE_FLOOR_REQUEST:
            return false;
        case CREATE_FLOOR_FAILURE:
        case CREATE_FLOORS_FAILURE:
        case EDIT_FLOOR_FAILURE:
        case DELETE_FLOOR_FAILURE:
        case ARCHIVE_FLOOR_FAILURE:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_FLOORS_REQUEST:
        case FETCH_SINGLE_FLOOR_REQUEST:
        case CREATE_FLOOR_REQUEST:
        case CREATE_FLOORS_REQUEST:
        case EDIT_FLOOR_REQUEST:
        case DELETE_FLOOR_REQUEST:
        case ARCHIVE_FLOOR_REQUEST:
            return null;
        case FETCH_ALL_FLOORS_FAILURE:
        case FETCH_SINGLE_FLOOR_FAILURE:
        case CREATE_FLOOR_FAILURE:
        case CREATE_FLOORS_FAILURE:
        case EDIT_FLOOR_FAILURE:
        case DELETE_FLOOR_FAILURE:
        case ARCHIVE_FLOOR_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function updatedFloorIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_FLOOR_REQUEST:
        case ARCHIVE_FLOOR_REQUEST:
        case CREATE_FLOORS_SUCCESS:
            return 0;
        case CREATE_FLOOR_SUCCESS:
        case ARCHIVE_FLOOR_SUCCESS:
            return action.payload.id;
        default:
            return state;
    }
}

function floorsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_FLOORS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_FLOOR_SUCCESS:
        case CREATE_FLOOR_SUCCESS:
        case EDIT_FLOOR_SUCCESS:
        case ARCHIVE_FLOOR_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case CREATE_DRAWING_SUCCESS:
            return updateObj(state, [action.payload.floorID], {
                ...state[action.payload.floorID],
                drawingIDs: [
                    ...state[action.payload.floorID].drawingIDs,
                    action.payload.id
                ]
            });
        case REORDER_FLOORS: {
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
