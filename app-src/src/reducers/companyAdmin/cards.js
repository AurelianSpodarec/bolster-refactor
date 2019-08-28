import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_ALL_CARDS_REQUEST,
    FETCH_ALL_CARDS_SUCCESS,
    FETCH_ALL_CARDS_FAILURE,
    ADD_CARD_REQUEST,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAILURE,
    SET_PRIMARY_CARD_REQUEST,
    SET_PRIMARY_CARD_SUCCESS,
    SET_PRIMARY_CARD_FAILURE,
    DELETE_CARD_REQUEST,
    DELETE_CARD_SUCCESS,
    DELETE_CARD_FAILURE
} from 'constants/actionTypes/cards';

export default combineReducers({
    cards: cardsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
    isPosting: isPostingReducer,
    isPostingSuccess: isPostingSuccessReducer,
    isPostingFailure: isPostingFailureReducer,
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
        case SET_PRIMARY_CARD_REQUEST:
            return false;
        case ADD_CARD_SUCCESS:
        case SET_PRIMARY_CARD_SUCCESS:
            return true;
        default:
            return state;
    }
}

function updatedCardIDReducer(state = 0, action) {
    switch (action.type) {
        case ADD_CARD_REQUEST:
        case DELETE_CARD_REQUEST:
            return 0;
        case ADD_CARD_SUCCESS:
            return action.payload.id;
        case DELETE_CARD_SUCCESS:
            return action.id;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_CARDS_REQUEST:
        case SET_PRIMARY_CARD_REQUEST:
        case DELETE_CARD_REQUEST:
            return null;
        case FETCH_ALL_CARDS_FAILURE:
        case SET_PRIMARY_CARD_FAILURE:
        case DELETE_CARD_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case SET_PRIMARY_CARD_REQUEST:
        case ADD_CARD_REQUEST:
        case DELETE_CARD_REQUEST:
            return false;
        case SET_PRIMARY_CARD_FAILURE:
        case ADD_CARD_FAILURE:
        case DELETE_CARD_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADD_CARD_REQUEST:
            return true;
        case ADD_CARD_SUCCESS:
        case ADD_CARD_FAILURE:
            return false;
        default:
            return state;
    }
}

function isPostingSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_CARD_REQUEST:
            return false;
        case ADD_CARD_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isPostingFailureReducer(state = false, action) {
    switch (action.type) {
        case ADD_CARD_REQUEST:
            return false;
        case ADD_CARD_FAILURE:
            return true;
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
        case DELETE_CARD_SUCCESS:
            return removeObjItem(state, action.id);
        case SET_PRIMARY_CARD_SUCCESS: {
            const cards = Object.values(state).map(card => ({
                ...card,
                isPrimary: action.cardID === card.id
            }));
            return convertArrToObj(cards);
        }

        default:
            return state;
    }
}
