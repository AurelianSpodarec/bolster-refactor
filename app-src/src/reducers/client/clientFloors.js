import { combineReducers } from 'redux';
import {
    CLIENT_FETCH_ALL_FLOORS_REQUEST,
    CLIENT_FETCH_SINGLE_FLOOR_REQUEST,
    CLIENT_FETCH_SINGLE_FLOOR_SUCCESS,
    CLIENT_FETCH_SINGLE_FLOOR_FAILURE,
    CLIENT_FETCH_ALL_FLOORS_SUCCESS,
    CLIENT_FETCH_ALL_FLOORS_FAILURE
} from 'constants/client/actionTypes/clientFloors';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    floors: floorsReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_FLOORS_REQUEST:
        case CLIENT_FETCH_SINGLE_FLOOR_REQUEST:
            return true;
        case CLIENT_FETCH_SINGLE_FLOOR_SUCCESS:
        case CLIENT_FETCH_SINGLE_FLOOR_FAILURE:
        case CLIENT_FETCH_ALL_FLOORS_SUCCESS:
        case CLIENT_FETCH_ALL_FLOORS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_FLOORS_REQUEST:
        case CLIENT_FETCH_SINGLE_FLOOR_REQUEST:
            return null;
        case CLIENT_FETCH_ALL_FLOORS_FAILURE:
        case CLIENT_FETCH_SINGLE_FLOOR_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function floorsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_ALL_FLOORS_REQUEST:
            return {};
        case CLIENT_FETCH_ALL_FLOORS_SUCCESS:
            return convertArrToObj(action.payload);
        case CLIENT_FETCH_SINGLE_FLOOR_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
