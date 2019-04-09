import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_CARDS_REQUEST,
    FETCH_ALL_CARDS_SUCCESS,
    FETCH_ALL_CARDS_FAILURE
} from 'constants/actionTypes/cards';

export default combineReducers({
    cards: cardsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_CARDS_REQUEST:
            return true;
        case FETCH_ALL_CARDS_SUCCESS:
        case FETCH_ALL_CARDS_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_CARDS_REQUEST:
            return null;
        case FETCH_ALL_CARDS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function cardsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_CARDS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
