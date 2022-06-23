import { combineReducers } from 'redux';
import {
    FETCH_PAY_RATES_FAILURE,
    FETCH_PAY_RATES_REQUEST,
    FETCH_PAY_RATES_SUCCESS,
    POST_ASSIGN_PAY_RATES_FAILURE,
    POST_ASSIGN_PAY_RATES_REQUEST,
    POST_ASSIGN_PAY_RATES_SUCCESS,
    POST_COMPANY_PAY_RATES_FAILURE,
    POST_COMPANY_PAY_RATES_REQUEST,
    POST_COMPANY_PAY_RATES_SUCCESS,
} from 'constants/actionTypes/payRates';

export default combineReducers({
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    payRates: payRatesReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PAY_RATES_REQUEST:
            return true;
        case FETCH_PAY_RATES_SUCCESS:
        case FETCH_PAY_RATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_COMPANY_PAY_RATES_REQUEST:
        case POST_ASSIGN_PAY_RATES_REQUEST:
            return true;
        case POST_COMPANY_PAY_RATES_SUCCESS:
        case POST_COMPANY_PAY_RATES_FAILURE:
        case POST_ASSIGN_PAY_RATES_SUCCESS:
        case POST_ASSIGN_PAY_RATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_COMPANY_PAY_RATES_SUCCESS:
        case POST_ASSIGN_PAY_RATES_SUCCESS:
            return true;
        case POST_COMPANY_PAY_RATES_REQUEST:
        case POST_COMPANY_PAY_RATES_FAILURE:
        case POST_ASSIGN_PAY_RATES_REQUEST:
        case POST_ASSIGN_PAY_RATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PAY_RATES_REQUEST:
            return null;

        case FETCH_PAY_RATES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function payRatesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PAY_RATES_SUCCESS:
        case POST_COMPANY_PAY_RATES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
