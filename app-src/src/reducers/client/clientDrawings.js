import { combineReducers } from 'redux';
import {
    CLIENT_FETCH_SINGLE_DRAWING_REQUEST,
    CLIENT_FETCH_SINGLE_DRAWING_SUCCESS,
    CLIENT_FETCH_SINGLE_DRAWING_FAILURE,
    CLIENT_FETCH_ALL_DRAWINGS_REQUEST,
    CLIENT_FETCH_ALL_DRAWINGS_SUCCESS,
    CLIENT_FETCH_ALL_DRAWINGS_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    drawings: drawingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_DRAWINGS_REQUEST:
        case CLIENT_FETCH_SINGLE_DRAWING_REQUEST:
            return true;
        case CLIENT_FETCH_ALL_DRAWINGS_SUCCESS:
        case CLIENT_FETCH_ALL_DRAWINGS_FAILURE:
        case CLIENT_FETCH_SINGLE_DRAWING_FAILURE:
        case CLIENT_FETCH_SINGLE_DRAWING_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_DRAWINGS_REQUEST:
        case CLIENT_FETCH_SINGLE_DRAWING_REQUEST:
            return null;
        case CLIENT_FETCH_ALL_DRAWINGS_FAILURE:
        case CLIENT_FETCH_SINGLE_DRAWING_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_DRAWINGS_SUCCESS:
            return convertArrToObj(action.payload);
        case CLIENT_FETCH_SINGLE_DRAWING_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
