import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
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
    UPDATE_PIN_COORDINATES
} from 'constants/actionTypes/drawings';

export default combineReducers({
    drawings: drawingsReducer,
    isFetching: isFetchingReducer,
    updatedID: updatedIDReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_REQUEST:
        case FETCH_SINGLE_DRAWING_REQUEST:
            return true;
        case FETCH_ALL_DRAWINGS_SUCCESS:
        case FETCH_ALL_DRAWINGS_FAILURE:
            return false;
        default:
            return state;
    }
}

function updatedIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_DRAWING_REQUEST:
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
            return null;
        case FETCH_ALL_DRAWINGS_FAILURE:
        case FETCH_SINGLE_DRAWING_FAILURE:
        case CREATE_DRAWING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DRAWINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_DRAWING_SUCCESS:
        case CREATE_DRAWING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
