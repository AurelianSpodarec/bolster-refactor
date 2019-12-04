import {
    ADMIN_MERGE_DRAWING_REQUEST,
    ADMIN_MERGE_DRAWING_SUCCESS,
    ADMIN_MERGE_DRAWING_FAILURE
} from 'constants/actionTypes/mergeTool';
import { combineReducers } from 'redux';
import { ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST } from 'constants/actionTypes/companies';
import { HIDE_MODAL } from 'constants/actionTypes/generic';


export default combineReducers({
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer
});

function isPostingReducer(state=false, action) {
    switch(action.type) {
        case ADMIN_MERGE_DRAWING_REQUEST:
            return true;
        case ADMIN_MERGE_DRAWING_SUCCESS:
        case ADMIN_MERGE_DRAWING_FAILURE:
            return false;
        default: 
            return state;
    }
}

function postSuccessReducer(state=false, action) {
    switch(action.type) {
        case ADMIN_MERGE_DRAWING_SUCCESS: 
            return true;
        case ADMIN_MERGE_DRAWING_REQUEST:
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST:
        case HIDE_MODAL:
            return false;
        default:
            return state;
    }
}
        
        function errorReducer(state = null, action) {
            switch(action.type) {
                case ADMIN_MERGE_DRAWING_FAILURE:
                    return action.error;
                case ADMIN_MERGE_DRAWING_REQUEST:
                case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST:
                case HIDE_MODAL:
            return null;
        default:
            return state;
    }
}

