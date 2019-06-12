import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_CREDITS_REQUEST,
    FETCH_CREDITS_SUCCESS,
    FETCH_CREDITS_FAILURE,
    CREATE_CREDITS_FAILURE,
    CREATE_CREDITS_SUCCESS,
    CREATE_CREDITS_REQUEST,
    FETCH_COST_OF_CREDITS_REQUEST,
    FETCH_COST_OF_CREDITS_SUCCESS,
    FETCH_COST_OF_CREDITS_FAILURE
} from 'constants/actionTypes/credits';

export default combineReducers({
    credits: creditsReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
    error: errorReducer,
    costOfCredits: costOfCreditsReducer,
    vatCostOfCredits: vatCostOfCreditsReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_CREDITS_REQUEST:
        case FETCH_COST_OF_CREDITS_REQUEST:
            return true;
        case FETCH_CREDITS_SUCCESS:
        case FETCH_COST_OF_CREDITS_SUCCESS:
        case FETCH_COST_OF_CREDITS_FAILURE:
        case FETCH_CREDITS_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_CREDITS_REQUEST:
            return false;
        case CREATE_CREDITS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_CREDITS_FAILURE:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_CREDITS_REQUEST:
        case CREATE_CREDITS_REQUEST:
        case FETCH_COST_OF_CREDITS_REQUEST:
            return null;
        case FETCH_CREDITS_FAILURE:
        case CREATE_CREDITS_FAILURE:
        case FETCH_COST_OF_CREDITS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function creditsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CREDITS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function costOfCreditsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COST_OF_CREDITS_SUCCESS:
            return action.payload.cost;
        default:
            return state;
    }
}
function vatCostOfCreditsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_COST_OF_CREDITS_SUCCESS:
            return action.payload.vatCost;
        default:
            return state;
    }
}
