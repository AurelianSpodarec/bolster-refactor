import { combineReducers } from 'redux';
import { UPDATE_HIERARCHY_ADD_STATE } from 'constants/actionTypes/hierarchy';
import {
    CREATE_BUILDING_SUCCESS,
    CREATE_BUILDINGS_SUCCESS
} from 'constants/actionTypes/buildings';
import {
    CREATE_FLOOR_SUCCESS,
    CREATE_FLOORS_SUCCESS
} from 'constants/actionTypes/floors';
import {
    CREATE_DRAWING_SUCCESS,
    CREATE_DRAWINGS_SUCCESS
} from 'constants/actionTypes/drawings';

export default combineReducers({
    isAdding: isAddingReducer
});

function isAddingReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_HIERARCHY_ADD_STATE:
            return action.value;
        // set true if only creating single
        case CREATE_BUILDING_SUCCESS:
        case CREATE_FLOOR_SUCCESS:
        case CREATE_DRAWING_SUCCESS:
            return true;
        // just making sure
        case CREATE_BUILDINGS_SUCCESS:
        case CREATE_FLOORS_SUCCESS:
        case CREATE_DRAWINGS_SUCCESS:
            return false;
        default:
            return state;
    }
}
