import { combineReducers } from 'redux';
import {
    FETCH_AUTH_AREA_TEXT_REQUEST,
    FETCH_AUTH_AREA_TEXT_SUCCESS,
    FETCH_AUTH_AREA_TEXT_FAILURE,
} from 'constants/actionTypes/auth';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    isFetching: isFetchingReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_AUTH_AREA_TEXT_REQUEST:
            return false;
        case FETCH_AUTH_AREA_TEXT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function authReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_AUTH_AREA_TEXT_REQUEST:
            return {};
        case FETCH_AUTH_AREA_TEXT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_AUTH_AREA_TEXT_REQUEST:
            return true;
        case FETCH_AUTH_AREA_TEXT_SUCCESS:
        case FETCH_AUTH_AREA_TEXT_FAILURE:
            return false;
        default:
            return state;
    }
}
