import { combineReducers } from 'redux';

import {
    FETCH_COSTING_AND_ESTIMATING_RESULTS_FAILURE,
    FETCH_COSTING_AND_ESTIMATING_RESULTS_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_RESULTS_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_CART_FAILURE,
    FETCH_COSTING_AND_ESTIMATING_CART_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST,
    CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';

export default combineReducers({
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    costingAndEstimatingResults: costingAndEstimatingResultsReducer,
    costingAndEstimatingCart: costingAndEstimatingCartReducer,
    isFetchingData: isFetchingDataReducer,
    isFetchingCart: isFetchingCartReducer,
    error: errorReducer,
});

function isFetchingDataReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_REQUEST:
            return true;
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_SUCCESS:
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_FAILURE:
            return false;
        default:
            return state;
    }
}
function isFetchingCartReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_CART_REQUEST:
            return true;
        case FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS:
        case FETCH_COSTING_AND_ESTIMATING_CART_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST:
            return true;
        case CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS:
            return true;
        case CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_REQUEST:
        case FETCH_COSTING_AND_ESTIMATING_CART_REQUEST:
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_SUCCESS:
        case FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS:
            return null;
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_FAILURE:
        case FETCH_COSTING_AND_ESTIMATING_CART_FAILURE:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function costingAndEstimatingResultsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_SUCCESS:
            return action.payload;
        case FETCH_COSTING_AND_ESTIMATING_RESULTS_REQUEST:
        default:
            return state;
    }
}

function costingAndEstimatingCartReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
