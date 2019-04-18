import { combineReducers } from 'redux';
import {
    SA_FETCH_COMPANY_SUBSCRIPTION_REQUEST,
    SA_FETCH_COMPANY_SUBSCRIPTION_SUCCESS,
    SA_FETCH_COMPANY_SUBSCRIPTION_FAILURE
} from 'constants/actionTypes/superAdminSubscriptions';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    subscription: subscriptionReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case SA_FETCH_COMPANY_SUBSCRIPTION_REQUEST:
            return true;
        case SA_FETCH_COMPANY_SUBSCRIPTION_SUCCESS:
        case SA_FETCH_COMPANY_SUBSCRIPTION_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case SA_FETCH_COMPANY_SUBSCRIPTION_REQUEST:
            return null;
        case SA_FETCH_COMPANY_SUBSCRIPTION_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function subscriptionReducer(state = {}, action) {
    switch (action.type) {
        case SA_FETCH_COMPANY_SUBSCRIPTION_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
