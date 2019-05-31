import { combineReducers } from 'redux';

import {
    POST_CONTACT_REQUEST,
    POST_CONTACT_SUCCESS,
    POST_CONTACT_FAILURE
} from 'constants/actionTypes/contact';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_CONTACT_REQUEST:
        case POST_CONTACT_FAILURE:
            return false;
        case POST_CONTACT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_CONTACT_REQUEST:
            return null;

        case POST_CONTACT_FAILURE:
            return action.error;
        default:
            return state;
    }
}
