import { combineReducers } from 'redux';
import {
    FETCH_PINS_BY_SHARE_LINK_REQUEST,
    FETCH_PINS_BY_SHARE_LINK_SUCCESS,
    FETCH_PINS_BY_SHARE_LINK_FAILURE
} from 'constants/actionTypes/pins';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
    pins: pinsReducer
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PINS_BY_SHARE_LINK_REQUEST:
            return false;
        case FETCH_PINS_BY_SHARE_LINK_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PINS_BY_SHARE_LINK_REQUEST:
            return false;
        case FETCH_PINS_BY_SHARE_LINK_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function pinsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PINS_BY_SHARE_LINK_REQUEST:
            return {};
        case FETCH_PINS_BY_SHARE_LINK_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
