import { combineReducers } from 'redux';
import {
    FETCH_DRAWING_BY_SHARE_LINK_REQUEST,
    FETCH_DRAWING_BY_SHARE_LINK_SUCCESS,
    FETCH_DRAWING_BY_SHARE_LINK_FAILURE
} from 'constants/actionTypes/drawings';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    drawing: drawingsReducer
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_BY_SHARE_LINK_REQUEST:
            return false;
        case FETCH_DRAWING_BY_SHARE_LINK_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_DRAWING_BY_SHARE_LINK_REQUEST:
            return false;
        case FETCH_DRAWING_BY_SHARE_LINK_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DRAWING_BY_SHARE_LINK_REQUEST:
            return {};
        case FETCH_DRAWING_BY_SHARE_LINK_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
