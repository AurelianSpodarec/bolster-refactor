import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_ALL_CARDS_REQUEST,
    FETCH_ALL_CARDS_SUCCESS,
    FETCH_ALL_CARDS_FAILURE,
    ADD_CARD_REQUEST,
    ADD_CARD_SUCCESS
} from 'constants/actionTypes/cards';

export default combineReducers({
    cards: cardsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    updatedCardID: updatedCardIDReducer
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_CARD_REQUEST:
            return false;
        case ADD_CARD_SUCCESS:
            return true;
        default:
            return state;
    }
}

function updatedCardIDReducer(state = 0, action) {
    switch (action.type) {
        case ADD_CARD_REQUEST:
            return 0;
        case ADD_CARD_SUCCESS:
            return action.payload.id;
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
        case ADD_CARD_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
