import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
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
    DELETE_FLOOR_FAILURE
} from 'constants/actionTypes/floors';
import {
    ARCHIVE_BUILDING_REQUEST,
    ARCHIVE_BUILDING_SUCCESS,
    ARCHIVE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

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
        case EDIT_FLOOR_REQUEST:
        case DELETE_FLOOR_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return false;
        case CREATE_FLOOR_SUCCESS:
        case EDIT_FLOOR_SUCCESS:
        case DELETE_FLOOR_SUCCESS:
        case ARCHIVE_BUILDING_SUCCESS:
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
        case EDIT_FLOOR_REQUEST:
        case DELETE_FLOOR_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return false;
        case CREATE_FLOOR_FAILURE:
        case EDIT_FLOOR_FAILURE:
        case DELETE_FLOOR_FAILURE:
        case ARCHIVE_BUILDING_FAILURE:
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
        case EDIT_FLOOR_REQUEST:
        case DELETE_FLOOR_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return null;
        case FETCH_ALL_FLOORS_FAILURE:
        case FETCH_SINGLE_FLOOR_FAILURE:
        case CREATE_FLOOR_FAILURE:
        case EDIT_FLOOR_FAILURE:
        case DELETE_FLOOR_FAILURE:
        case ARCHIVE_BUILDING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function updatedFloorIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_FLOOR_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return 0;
        case CREATE_FLOOR_SUCCESS:
        case ARCHIVE_BUILDING_SUCCESS:
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
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
