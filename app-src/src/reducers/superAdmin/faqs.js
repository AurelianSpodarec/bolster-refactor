import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import {
    FETCH_ALL_FAQS_REQUEST,
    FETCH_ALL_FAQS_SUCCESS,
    FETCH_ALL_FAQS_FAILURE,
    FETCH_SINGLE_FAQS_REQUEST,
    FETCH_SINGLE_FAQS_SUCCESS,
    FETCH_SINGLE_FAQS_FAILURE,
    CREATE_FAQS_REQUEST,
    CREATE_FAQS_SUCCESS,
    CREATE_FAQS_FAILURE,
    DELETE_FAQS_REQUEST,
    DELETE_FAQS_SUCCESS,
    DELETE_FAQS_FAILURE,
    UPDATE_FAQS_REQUEST,
    UPDATE_FAQS_SUCCESS,
    UPDATE_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    faqs: faqsReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case DELETE_FAQS_REQUEST:
        case UPDATE_FAQS_REQUEST:
        case CREATE_FAQS_REQUEST:
            return true;
        case DELETE_FAQS_SUCCESS:
        case DELETE_FAQS_FAILURE:
        case UPDATE_FAQS_SUCCESS:
        case UPDATE_FAQS_FAILURE:
        case CREATE_FAQS_SUCCESS:
        case CREATE_FAQS_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_FAQS_SUCCESS:
        case DELETE_FAQS_SUCCESS:
        case CREATE_FAQS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case UPDATE_FAQS_REQUEST:
        case CREATE_FAQS_REQUEST:
        case DELETE_FAQS_REQUEST:
            return null;
        case UPDATE_FAQS_FAILURE:
        case CREATE_FAQS_FAILURE:
        case DELETE_FAQS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_FAQS_REQUEST:
        case FETCH_SINGLE_FAQS_REQUEST:
            return true;
        case FETCH_ALL_FAQS_SUCCESS:
        case FETCH_ALL_FAQS_FAILURE:
        case FETCH_SINGLE_FAQS_SUCCESS:
        case FETCH_SINGLE_FAQS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_FAQS_REQUEST:
            return null;
        case FETCH_ALL_FAQS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function faqsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_FAQS_SUCCESS:
            return convertArrToObj(action.payload);
        case FETCH_SINGLE_FAQS_SUCCESS:
            return updateObj(state, 'id', action.payload);
        case DELETE_FAQS_SUCCESS:
            return omit(state, action.id);
        default:
            return state;
    }
}
