import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_DROPDOWN_OPTIONS_REQUEST,
    FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS,
    FETCH_ALL_DROPDOWN_OPTIONS_FAILURE
} from 'constants/actionTypes/dropdownOptions';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DROPDOWN_OPTIONS_REQUEST:
            return true;
        case FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS:
        case FETCH_ALL_DROPDOWN_OPTIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

// function postSuccessReducer(state = false, action) {
//     switch (action.type) {
//         case CREATE_BUILDING_REQUEST:
//         case EDIT_BUILDING_REQUEST:
//         case DELETE_BUILDING_REQUEST:
//         case ARCHIVE_BUILDING_REQUEST:
//             return false;
//         case CREATE_BUILDING_SUCCESS:
//         case EDIT_BUILDING_SUCCESS:
//         case DELETE_BUILDING_SUCCESS:
//         case ARCHIVE_BUILDING_SUCCESS:
//             return true;
//         default:
//             return state;
//     }
// }

// function postFailureReducer(state = false, action) {
//     switch (action.type) {
//         case CREATE_BUILDING_REQUEST:
//         case EDIT_BUILDING_REQUEST:
//         case DELETE_BUILDING_REQUEST:
//         case ARCHIVE_BUILDING_REQUEST:
//             return false;
//         case CREATE_BUILDING_FAILURE:
//         case EDIT_BUILDING_FAILURE:
//         case DELETE_BUILDING_FAILURE:
//         case ARCHIVE_BUILDING_FAILURE:
//             return true;
//         default:
//             return state;
//     }
// }

// function deleteSuccessReducer(state = false, action) {
//     switch (action.type) {
//         case DELETE_BUILDING_REQUEST:
//             return false;
//         case DELETE_BUILDING_SUCCESS:
//             return true;
//         default:
//             return state;
//     }
// }

// function updatedBuildingReducer(state = 0, action) {
//     switch (action.type) {
//         case CREATE_BUILDING_SUCCESS:
//         case EDIT_BUILDING_SUCCESS:
//             return action.payload.id;
//         default:
//             return state;
//     }
// }

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DROPDOWN_OPTIONS_REQUEST:
            return null;
        case FETCH_ALL_DROPDOWN_OPTIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function dropdownOptionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DROPDOWN_OPTIONS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

// function nameFilterReducer(state = '', action) {
//     switch (action.type) {
//         case UPDATE_BUILDINGS_SEARCH_TERM:
//             return action.searchTerm;
//         default:
//             return state;
//     }
// }

// function statusFilterReducer(state = '', action) {
//     switch (action.type) {
//         case SET_BUILDINGS_FILTER_STATUS:
//             return action.searchTerm;
//         default:
//             return state;
//     }
// }
