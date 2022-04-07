import { combineReducers } from 'redux';
import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_PRELIMS_FAILURE,
    FETCH_ALL_PRELIMS_REQUEST,
    FETCH_ALL_PRELIMS_SUCCESS,
} from 'constants/actionTypes/prelims';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    prelims: prelimsReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_REQUEST:
            return true;
        case FETCH_ALL_PRELIMS_SUCCESS:
        case FETCH_ALL_PRELIMS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_REQUEST:
            return null;
        case FETCH_ALL_PRELIMS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function prelimsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
