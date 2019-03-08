import { combineReducers } from 'redux';

import {
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILURE
} from 'constants/actionTypes/auth';

export default combineReducers({
    isAuthorized: isAuthorizedReducer,
    checkComplete: checkCompleteReducer
});

function isAuthorizedReducer(state = false, action) {
    switch (action.type) {
        case AUTHORIZE_SUCCESS:
            return true;
        case AUTHORIZE_FAILURE:
            return false;
        default:
            return state;
    }
}

function checkCompleteReducer(state = false, action) {
    switch (action.type) {
        case AUTHORIZE_REQUEST:
            return false;
        case AUTHORIZE_SUCCESS:
        case AUTHORIZE_FAILURE:
            return true;
        default:
            return state;
    }
}
