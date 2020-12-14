import { combineReducers } from 'redux';

import {
    FETCH_RECENT_UPDATES_REQUEST,
    FETCH_RECENT_UPDATES_SUCCESS,
    FETCH_RECENT_UPDATES_FAILURE,
    POST_RECENT_UPDATES_REQUEST,
    POST_RECENT_UPDATES_SUCCESS,
    POST_RECENT_UPDATES_FAILURE,
} from 'constants/actionTypes/recentUpdates';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    updates: updatesReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    error: errorReducer,
    postError: postErrorReducer,
    success: successReducer,
    postSuccess: postSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_REQUEST:
            return true;
        case FETCH_RECENT_UPDATES_SUCCESS:
        case FETCH_RECENT_UPDATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_RECENT_UPDATES_REQUEST:
            return true;
        case POST_RECENT_UPDATES_SUCCESS:
        case POST_RECENT_UPDATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_REQUEST:
            return null;
        case FETCH_RECENT_UPDATES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case POST_RECENT_UPDATES_REQUEST:
            return null;
        case POST_RECENT_UPDATES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function successReducer(state = false, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_REQUEST:
            return false;
        case FETCH_RECENT_UPDATES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_RECENT_UPDATES_REQUEST:
            return false;
        case POST_RECENT_UPDATES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function updatesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_RECENT_UPDATES_SUCCESS:
            console.log(action.payload, '<---- action payload');
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
