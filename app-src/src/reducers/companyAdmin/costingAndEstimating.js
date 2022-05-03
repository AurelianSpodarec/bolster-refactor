import { combineReducers } from 'redux';

import {
    FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE,
    FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_CART_FAILURE,
    FETCH_COSTING_AND_ESTIMATING_CART_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
    LINK_PRELIM_REQUEST,
    LINK_PRELIM_SUCCESS,
    LINK_PRELIM_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    costingAndEstimatingData: costingAndEstimatingDataReducer,
    costingAndEstimatingCart: costingAndEstimatingCartReducer,
    costingAndEstimatingPrelims: costingAndEstimatingPrelimsReducer,
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

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case LINK_PRELIM_REQUEST:
            return true;
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case LINK_PRELIM_SUCCESS:
        case LINK_PRELIM_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case LINK_PRELIM_REQUEST:
            return true;
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case LINK_PRELIM_SUCCESS:
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
        case LINK_PRELIM_REQUEST:
            return null;
        case FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE:
        case FETCH_COSTING_AND_ESTIMATING_CART_FAILURE:
        case LINK_PRELIM_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function costingAndEstimatingDataReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS:
            return action.payload;
        case FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST:
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

function costingAndEstimatingPrelimsReducer(state = {}, action) {
    switch (action.type) {
        case LINK_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
