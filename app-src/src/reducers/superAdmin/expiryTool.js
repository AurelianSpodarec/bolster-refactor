import { combineReducers } from 'redux';

import {
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE,
} from 'constants/actionTypes/companies';

export default combineReducers({
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST:
            return true;
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS:
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE:
            return false;
        default:
            return state;
    }
}
function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST:
            return false;
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST:
            return null;
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE:
            return action.error;
        default:
            return state;
    }
}
