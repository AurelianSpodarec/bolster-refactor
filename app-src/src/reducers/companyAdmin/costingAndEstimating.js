import { combineReducers } from 'redux';

import {
    FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE,
    FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_CART_FAILURE,
    FETCH_COSTING_AND_ESTIMATING_CART_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS,
} from 'constants/actionTypes/costingAndEstimating';

export default combineReducers({
    costingAndEstimatingData: costingAndEstimatingDataReducer,
    costingAndEstimatingCart: costingAndEstimatingCartReducer,
    isFetchingData: isFetchingDataReducer,
    isFetchingCart: isFetchingCartReducer,
    error: errorReducer,
});

function isFetchingDataReducer(state = false, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST:
            return true;
        case FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS:
        case FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE:
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

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST:
        case FETCH_COSTING_AND_ESTIMATING_CART_REQUEST:
        case FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS:
        case FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS:
            return null;
        case FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE:
        case FETCH_COSTING_AND_ESTIMATING_CART_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function costingAndEstimatingDataReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS:
            return action.payload;
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
