import { combineReducers } from 'redux';

import {
    UPLOAD_USER_GUIDE_REQUEST,
    UPLOAD_USER_GUIDE_SUCCESS,
    UPLOAD_USER_GUIDE_FAILURE,
} from 'constants/actionTypes/userGuide';

export default combineReducers({
    postSuccess: postSuccessReducer,
    error: errorReducer,
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case UPLOAD_USER_GUIDE_REQUEST:
            return false;
        case UPLOAD_USER_GUIDE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case UPLOAD_USER_GUIDE_REQUEST:
            return null;
        case UPLOAD_USER_GUIDE_FAILURE:
            return action.error;
        default:
            return state;
    }
}
