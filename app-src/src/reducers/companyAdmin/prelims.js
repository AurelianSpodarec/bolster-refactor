import { combineReducers } from 'redux';
import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import {
    CREATE_PRELIM_FAILURE,
    CREATE_PRELIM_REQUEST,
    CREATE_PRELIM_SUCCESS,
    DELETE_PRELIM_FAILURE,
    DELETE_PRELIM_REQUEST,
    DELETE_PRELIM_SUCCESS,
    EDIT_PRELIM_FAILURE,
    EDIT_PRELIM_REQUEST,
    EDIT_PRELIM_SUCCESS,
    FETCH_ALL_PRELIMS_FAILURE,
    FETCH_ALL_PRELIMS_REQUEST,
    FETCH_ALL_PRELIMS_SUCCESS,
    FETCH_PRELIM_FAILURE,
    FETCH_PRELIM_REQUEST,
    FETCH_PRELIM_SUCCESS,
    CREATE_HIERARCHY_PRELIM_REQUEST,
    CREATE_HIERARCHY_PRELIM_SUCCESS,
    CREATE_HIERARCHY_PRELIM_FAILURE,
    LINK_PRELIM_REQUEST,
    LINK_PRELIM_SUCCESS,
    LINK_PRELIM_FAILURE,
    EDIT_LINK_PRELIM_REQUEST,
    EDIT_LINK_PRELIM_SUCCESS,
    EDIT_LINK_PRELIM_FAILURE,
    DELETE_PRELIM_LINK_REQUEST,
    DELETE_PRELIM_LINK_SUCCESS,
    DELETE_PRELIM_LINK_FAILURE,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
} from 'constants/actionTypes/prelims';

export default combineReducers({
    error: errorReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    prelims: prelimsReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_REQUEST:
        case FETCH_PRELIM_REQUEST:
            return true;
        case FETCH_ALL_PRELIMS_SUCCESS:
        case FETCH_ALL_PRELIMS_FAILURE:
        case FETCH_PRELIM_SUCCESS:
        case FETCH_PRELIM_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PRELIM_REQUEST:
        case EDIT_PRELIM_REQUEST:
        case CREATE_HIERARCHY_PRELIM_REQUEST:
        case LINK_PRELIM_REQUEST:
        case EDIT_LINK_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case DELETE_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case DELETE_PRELIM_LINK_REQUEST:
            return true;
        case CREATE_PRELIM_FAILURE:
        case CREATE_PRELIM_SUCCESS:
        case EDIT_PRELIM_FAILURE:
        case EDIT_PRELIM_SUCCESS:
        case CREATE_HIERARCHY_PRELIM_SUCCESS:
        case CREATE_HIERARCHY_PRELIM_FAILURE:
        case LINK_PRELIM_SUCCESS:
        case LINK_PRELIM_FAILURE:
        case EDIT_LINK_PRELIM_SUCCESS:
        case EDIT_LINK_PRELIM_FAILURE:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case DELETE_PRELIM_SUCCESS:
        case DELETE_PRELIM_FAILURE:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case DELETE_PRELIM_LINK_SUCCESS:
        case DELETE_PRELIM_LINK_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PRELIM_REQUEST:
        case CREATE_PRELIM_FAILURE:
        case EDIT_PRELIM_REQUEST:
        case EDIT_PRELIM_FAILURE:
        case CREATE_HIERARCHY_PRELIM_REQUEST:
        case CREATE_HIERARCHY_PRELIM_FAILURE:
        case LINK_PRELIM_REQUEST:
        case LINK_PRELIM_FAILURE:
        case EDIT_LINK_PRELIM_REQUEST:
        case EDIT_LINK_PRELIM_FAILURE:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case DELETE_PRELIM_REQUEST:
        case DELETE_PRELIM_FAILURE:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case DELETE_PRELIM_LINK_REQUEST:
        case DELETE_PRELIM_LINK_FAILURE:
            return false;
        case CREATE_PRELIM_SUCCESS:
        case EDIT_PRELIM_SUCCESS:
        case CREATE_HIERARCHY_PRELIM_SUCCESS:
        case LINK_PRELIM_SUCCESS:
        case EDIT_LINK_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case DELETE_PRELIM_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case DELETE_PRELIM_LINK_SUCCESS:
            return true;
        default:
            return state;
    }
}
function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_REQUEST:
        case EDIT_PRELIM_REQUEST:
        case FETCH_PRELIM_REQUEST:
        case CREATE_HIERARCHY_PRELIM_REQUEST:
        case CREATE_PRELIM_REQUEST:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case LINK_PRELIM_REQUEST:
        case EDIT_LINK_PRELIM_REQUEST:
        case DELETE_PRELIM_REQUEST:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_REQUEST:
        case DELETE_PRELIM_LINK_REQUEST:
            return null;
        case FETCH_ALL_PRELIMS_FAILURE:
        case EDIT_PRELIM_FAILURE:
        case FETCH_PRELIM_FAILURE:
        case CREATE_HIERARCHY_PRELIM_FAILURE:
        case CREATE_PRELIM_FAILURE:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
        case LINK_PRELIM_FAILURE:
        case EDIT_LINK_PRELIM_FAILURE:
        case DELETE_PRELIM_FAILURE:
        case DELETE_PRELIM_LINK_FAILURE:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function prelimsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_PRELIM_SUCCESS:
        case EDIT_PRELIM_SUCCESS:
        case CREATE_PRELIM_SUCCESS:
        case CREATE_HIERARCHY_PRELIM_SUCCESS:
        case CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
        case LINK_PRELIM_SUCCESS:
        case EDIT_LINK_PRELIM_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_PRELIM_SUCCESS:
        case DELETE_PRELIM_LINK_SUCCESS:
        case DELETE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS:
            return removeObjItem(state, action.id);
        default:
            return state;
    }
}
