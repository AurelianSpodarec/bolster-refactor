import { combineReducers } from 'redux';
import { convertArrToObj, updateObj } from 'helpers/generic';
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
            return true;
        case FETCH_ALL_PRELIMS_SUCCESS:
        case FETCH_ALL_PRELIMS_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PRELIM_REQUEST:
            return true;
        case CREATE_PRELIM_FAILURE:
        case CREATE_PRELIM_SUCCESS:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PRELIM_SUCCESS:
        case DELETE_PRELIM_REQUEST:
            return true;
        case CREATE_PRELIM_REQUEST:
        case CREATE_PRELIM_FAILURE:
        case DELETE_PRELIM_SUCCESS:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_REQUEST:
        case EDIT_PRELIM_REQUEST:
        case DELETE_PRELIM_REQUEST:
            return null;
        case FETCH_ALL_PRELIMS_FAILURE:
        case EDIT_PRELIM_FAILURE:
        case DELETE_PRELIM_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function prelimsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_PRELIMS_SUCCESS:
            return convertArrToObj(action.payload);
        case EDIT_PRELIM_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
