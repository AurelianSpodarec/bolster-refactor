import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, moveItem } from 'helpers/generic';
import {
    FETCH_ALL_BUILDINGS_REQUEST,
    FETCH_ALL_BUILDINGS_SUCCESS,
    FETCH_ALL_BUILDINGS_FAILURE,
    FETCH_SINGLE_BUILDING_REQUEST,
    FETCH_SINGLE_BUILDING_SUCCESS,
    FETCH_SINGLE_BUILDING_FAILURE,
    CREATE_BUILDING_REQUEST,
    CREATE_BUILDING_SUCCESS,
    CREATE_BUILDING_FAILURE,
    EDIT_BUILDING_REQUEST,
    EDIT_BUILDING_SUCCESS,
    EDIT_BUILDING_FAILURE,
    UPDATE_BUILDINGS_SEARCH_TERM,
    SET_BUILDINGS_FILTER_STATUS,
    DELETE_BUILDING_REQUEST,
    DELETE_BUILDING_SUCCESS,
    DELETE_BUILDING_FAILURE,
    ARCHIVE_BUILDING_REQUEST,
    ARCHIVE_BUILDING_SUCCESS,
    ARCHIVE_BUILDING_FAILURE,
    REORDER_BUILDING,
    CREATE_BUILDINGS_REQUEST,
    CREATE_BUILDINGS_SUCCESS,
    CREATE_BUILDINGS_FAILURE
} from 'constants/actionTypes/buildings';
import { CREATE_FLOOR_SUCCESS } from 'constants/actionTypes/floors';

export default combineReducers({
    buildings: buildingsReducer,
    updatedBuildingID: updatedBuildingReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    deleteSuccess: deleteSuccessReducer,
    error: errorReducer,
    nameFilter: nameFilterReducer,
    statusFilter: statusFilterReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_REQUEST:
        case FETCH_SINGLE_BUILDING_REQUEST:
            return true;
        case FETCH_ALL_BUILDINGS_SUCCESS:
        case FETCH_ALL_BUILDINGS_FAILURE:
        case FETCH_SINGLE_BUILDING_SUCCESS:
        case FETCH_SINGLE_BUILDING_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_BUILDING_REQUEST:
        case CREATE_BUILDINGS_REQUEST:
        case EDIT_BUILDING_REQUEST:
        case DELETE_BUILDING_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return false;
        case CREATE_BUILDING_SUCCESS:
        case CREATE_BUILDINGS_SUCCESS:
        case EDIT_BUILDING_SUCCESS:
        case DELETE_BUILDING_SUCCESS:
        case ARCHIVE_BUILDING_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case CREATE_BUILDING_REQUEST:
        case CREATE_BUILDINGS_REQUEST:
        case EDIT_BUILDING_REQUEST:
        case DELETE_BUILDING_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return false;
        case CREATE_BUILDING_FAILURE:
        case CREATE_BUILDINGS_FAILURE:
        case EDIT_BUILDING_FAILURE:
        case DELETE_BUILDING_FAILURE:
        case ARCHIVE_BUILDING_FAILURE:
            return true;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_BUILDING_REQUEST:
            return false;
        case DELETE_BUILDING_SUCCESS:
            return true;
        default:
            return state;
    }
}

function updatedBuildingReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_BUILDING_SUCCESS:
        case EDIT_BUILDING_SUCCESS:
            return action.payload.id;
        case CREATE_BUILDINGS_SUCCESS:
            return 0;
        case ARCHIVE_BUILDING_SUCCESS:
            return 0;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_REQUEST:
        case CREATE_BUILDING_REQUEST:
        case CREATE_BUILDINGS_REQUEST:
        case FETCH_SINGLE_BUILDING_REQUEST:
        case EDIT_BUILDING_REQUEST:
        case DELETE_BUILDING_REQUEST:
        case ARCHIVE_BUILDING_REQUEST:
            return null;
        case FETCH_ALL_BUILDINGS_FAILURE:
        case FETCH_SINGLE_BUILDING_FAILURE:
        case CREATE_BUILDING_FAILURE:
        case CREATE_BUILDINGS_FAILURE:
        case EDIT_BUILDING_FAILURE:
        case DELETE_BUILDING_FAILURE:
        case ARCHIVE_BUILDING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function buildingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_REQUEST:
            return {};
        case FETCH_ALL_BUILDINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_BUILDING_SUCCESS:
        case CREATE_BUILDING_SUCCESS:
        case EDIT_BUILDING_SUCCESS:
        case ARCHIVE_BUILDING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case CREATE_FLOOR_SUCCESS:
            return updateObj(state, [action.payload.buildingID], {
                ...state[action.payload.buildingID],
                floorIDs: [
                    ...state[action.payload.buildingID].floorIDs,
                    action.payload.id
                ]
            });
        case REORDER_BUILDING: {
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

function nameFilterReducer(state = '', action) {
    switch (action.type) {
        case UPDATE_BUILDINGS_SEARCH_TERM:
            return action.searchTerm;
        default:
            return state;
    }
}

function statusFilterReducer(state = '', action) {
    switch (action.type) {
        case SET_BUILDINGS_FILTER_STATUS:
            return action.searchTerm;
        default:
            return state;
    }
}
