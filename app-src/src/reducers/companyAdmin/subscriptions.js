import { combineReducers } from 'redux';
import {
    FETCH_ALL_SUBSCRIPTIONS_REQUEST,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILURE,
    EDIT_SERVICE_RENEWAL_STATUS_FAILURE,
    EDIT_SUBSCRIPTION_RENEWAL_STATUS_SUCCESS,
    EDIT_SUBSCRIPTION_RENEWAL_STATUS_FAILURE,
    FETCH_PRO_RATA_SUBSCRIPTION_COST_REQUEST,
    FETCH_PRO_RATA_SUBSCRIPTION_COST_FAILURE,
    FETCH_PRO_RATA_SUBSCRIPTION_COST_SUCCESS
} from 'constants/actionTypes/subscriptions';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    subscriptions: subscriptionsReducer,
    proRataCost: proRataCostReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_SUBSCRIPTIONS_REQUEST:
        case FETCH_PRO_RATA_SUBSCRIPTION_COST_REQUEST:
            return true;
        case FETCH_ALL_SUBSCRIPTIONS_SUCCESS:
        case FETCH_ALL_SUBSCRIPTIONS_FAILURE:
        case FETCH_PRO_RATA_SUBSCRIPTION_COST_SUCCESS:
        case FETCH_PRO_RATA_SUBSCRIPTION_COST_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_SUBSCRIPTIONS_REQUEST:
        case FETCH_PRO_RATA_SUBSCRIPTION_COST_REQUEST:
            return null;
        case FETCH_ALL_SUBSCRIPTIONS_FAILURE:
        case EDIT_SERVICE_RENEWAL_STATUS_FAILURE:
        case EDIT_SUBSCRIPTION_RENEWAL_STATUS_FAILURE:
        case FETCH_PRO_RATA_SUBSCRIPTION_COST_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function subscriptionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SUBSCRIPTIONS_SUCCESS:
        case EDIT_SUBSCRIPTION_RENEWAL_STATUS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
function proRataCostReducer(state = 0, action) {
    switch (action.type) {
        case FETCH_PRO_RATA_SUBSCRIPTION_COST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
