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
    EDIT_LINK_PRELIM_REQUEST,
    EDIT_LINK_PRELIM_FAILURE,
    EDIT_LINK_PRELIM_SUCCESS,
    DELETE_LINK_PRELIM_REQUEST,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
    DELETE_LINK_PRELIM_FAILURE,
    DELETE_LINK_PRELIM_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST,
    CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { removeObjItem, updateObj } from 'helpers/generic';

export default combineReducers({
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    costingAndEstimatingData: costingAndEstimatingDataReducer,
    costingAndEstimatingCart: costingAndEstimatingCartReducer,
    costingAndEstimatingPrelims: costingAndEstimatingPrelimsReducer,
    isFetchingData: isFetchingDataReducer,
    isFetchingCart: isFetchingCartReducer,
    error: errorReducer,
    isDeleting: isDeletingReducer,
    deletionError: deletionErrorReducer,
    deleteSuccess: deleteSuccessReducer,
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
        case EDIT_LINK_PRELIM_REQUEST:
        case DELETE_LINK_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST:
            return true;
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case LINK_PRELIM_SUCCESS:
        case LINK_PRELIM_FAILURE:
        case EDIT_LINK_PRELIM_FAILURE:
        case EDIT_LINK_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case DELETE_LINK_PRELIM_FAILURE:
        case DELETE_LINK_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE:
            return false;
        default:
            return state;
    }
}

function isDeletingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_LINK_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
            return true;
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case DELETE_LINK_PRELIM_FAILURE:
        case DELETE_LINK_PRELIM_SUCCESS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case LINK_PRELIM_SUCCESS:
        case EDIT_LINK_PRELIM_SUCCESS:
        case DELETE_LINK_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS:
            return true;
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case LINK_PRELIM_REQUEST:
        case EDIT_LINK_PRELIM_REQUEST:
        case DELETE_LINK_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST:
            return false;
        default:
            return state;
    }
}

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_LINK_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
            return false;
        case DELETE_LINK_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
            return true;
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
        case EDIT_LINK_PRELIM_REQUEST:
        case DELETE_LINK_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS:
            return null;
        case FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE:
        case FETCH_COSTING_AND_ESTIMATING_CART_FAILURE:
        case LINK_PRELIM_FAILURE:
        case EDIT_LINK_PRELIM_FAILURE:
        case DELETE_LINK_PRELIM_FAILURE:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function deletionErrorReducer(state = null, action) {
    switch (action.type) {
        case DELETE_LINK_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
            return null;
        case DELETE_LINK_PRELIM_FAILURE:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
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
        case EDIT_LINK_PRELIM_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_LINK_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
