import { combineReducers } from 'redux';
import {
    FETCH_ADDON_PRORATA_COST_REQUEST,
    FETCH_ADDON_PRORATA_COST_SUCCESS,
    FETCH_ADDON_PRORATA_COST_FAILURE,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE,
} from 'constants/actionTypes/addOns';

export default combineReducers({
    isFetching: isFetchingReducer,
    addonProrataCost: addonProrataCostReducer,
    error: errorReducer,
    addOn: addOnReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer,
    isPosting: isPostingReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ADDON_PRORATA_COST_REQUEST:
            return true;
        case FETCH_ADDON_PRORATA_COST_SUCCESS:
        case FETCH_ADDON_PRORATA_COST_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST:
        case FETCH_ADDON_PRORATA_COST_REQUEST:
            return null;
        case EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE:
        case FETCH_ADDON_PRORATA_COST_FAILURE:
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

function addonProrataCostReducer(state = 0, action) {
    switch (action.type) {
        case FETCH_ADDON_PRORATA_COST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
