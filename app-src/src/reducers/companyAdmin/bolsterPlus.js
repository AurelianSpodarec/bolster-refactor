import { combineReducers } from 'redux';
import {
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE,
} from 'constants/actionTypes/subscriptions';

export default combineReducers({
    error: errorReducer,
    addOn: addOnReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    isPosting: isPostingReducer,
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST:
            return null;
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST:
            return true;
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS:
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST:
            return false;
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST:
            return false;
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE:
            return true;
        default:
            return state;
    }
}

function addOnReducer(state = {}, action) {
    switch (action.type) {
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
