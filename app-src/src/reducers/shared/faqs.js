import { combineReducers } from 'redux';
import {
    FETCH_ALL_FAQS_REQUEST,
    FETCH_ALL_FAQS_SUCCESS,
    FETCH_ALL_FAQS_FAILURE,
} from 'constants/actionTypes/faqs';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    faqs: faqsReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_FAQS_REQUEST:
            return true;
        case FETCH_ALL_FAQS_SUCCESS:
        case FETCH_ALL_FAQS_FAILURE:
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

function faqsReducer(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_FAQS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
