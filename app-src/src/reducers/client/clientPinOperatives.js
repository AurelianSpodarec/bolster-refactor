import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_PIN_OPERATIVES_REQUEST,
    CLIENT_FETCH_PIN_OPERATIVES_SUCCESS,
    CLIENT_FETCH_PIN_OPERATIVES_FAILURE
} from 'constants/client/actionTypes/clientPinOperatives';

export default combineReducers({
    users: companyUsersReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_OPERATIVES_REQUEST:
            return true;
        case CLIENT_FETCH_PIN_OPERATIVES_SUCCESS:
        case CLIENT_FETCH_PIN_OPERATIVES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_OPERATIVES_REQUEST:
            return null;
        case CLIENT_FETCH_PIN_OPERATIVES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function companyUsersReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_OPERATIVES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
