import { combineReducers } from 'redux';
import {
    FETCH_ALL_SUBSCRIPTIONS_REQUEST,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILURE,
    EDIT_SERVICE_RENEWAL_STATUS_FAILURE
} from 'constants/actionTypes/subscriptions';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    subscriptions: subscriptionsReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_SUBSCRIPTIONS_REQUEST:
            return true;
        case FETCH_ALL_SUBSCRIPTIONS_SUCCESS:
        case FETCH_ALL_SUBSCRIPTIONS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_SUBSCRIPTIONS_REQUEST:
            return null;
        case FETCH_ALL_SUBSCRIPTIONS_FAILURE:
        case EDIT_SERVICE_RENEWAL_STATUS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function subscriptionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SUBSCRIPTIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
