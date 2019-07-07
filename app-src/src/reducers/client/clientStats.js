import { combineReducers } from 'redux';
import {
    CLIENT_FETCH_PIN_STATS_REQUEST,
    CLIENT_FETCH_PIN_STATS_SUCCESS,
    CLIENT_FETCH_PIN_STATS_FAILURE
} from 'constants/client/actionTypes/clientStats';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    stats: statsReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_STATS_REQUEST:
            return true;
        case CLIENT_FETCH_PIN_STATS_SUCCESS:
        case CLIENT_FETCH_PIN_STATS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_STATS_REQUEST:
            return null;

        case CLIENT_FETCH_PIN_STATS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function statsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_STATS_REQUEST:
            return {};
        case CLIENT_FETCH_PIN_STATS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
