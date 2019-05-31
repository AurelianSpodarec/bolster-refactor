import { combineReducers } from 'redux';

import {
    POST_REQUEST_DEMO_REQUEST,
    POST_REQUEST_DEMO_SUCCESS,
    POST_REQUEST_DEMO_FAILURE
} from 'constants/actionTypes/requestDemo';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_REQUEST_DEMO_REQUEST:
        case POST_REQUEST_DEMO_FAILURE:
            return false;
        case POST_REQUEST_DEMO_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_REQUEST_DEMO_REQUEST:
            return null;

        case POST_REQUEST_DEMO_FAILURE:
            return action.error;
        default:
            return state;
    }
}
