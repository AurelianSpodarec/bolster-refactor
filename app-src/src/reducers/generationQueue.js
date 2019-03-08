import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_GENERATION_QUEUE_REQUEST,
    FETCH_GENERATION_QUEUE_SUCCESS,
    FETCH_GENERATION_QUEUE_FAILURE
} from 'constants/actionTypes/generationQueue';

export default combineReducers({
    generationQueue: generationQueueReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_GENERATION_QUEUE_REQUEST:
            return true;
        case FETCH_GENERATION_QUEUE_SUCCESS:
        case FETCH_GENERATION_QUEUE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_GENERATION_QUEUE_REQUEST:
            return null;
        case FETCH_GENERATION_QUEUE_FAILURE:
            return action.error.message;
        default:
            return state;
    }
}

function generationQueueReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_GENERATION_QUEUE_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
