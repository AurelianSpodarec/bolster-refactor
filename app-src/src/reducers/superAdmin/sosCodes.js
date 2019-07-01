import { combineReducers } from 'redux';

import { convertArrToObj, updateObj } from 'helpers/generic';
import {
    FETCH_ALL_SOS_CODES_REQUEST,
    FETCH_ALL_SOS_CODES_SUCCESS,
    FETCH_ALL_SOS_CODES_FAILURE,
    CREATE_SOS_CODE_REQUEST,
    CREATE_SOS_CODE_SUCCESS,
    CREATE_SOS_CODE_FAILURE
} from 'constants/actionTypes/superAdminSOSCodes';

export default combineReducers({
    sosCodes: sosCodesReducer,
    isFetching: isFetchingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
    createdSOSCode: createdSOSCodeReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_SOS_CODES_REQUEST:
            return true;
        case FETCH_ALL_SOS_CODES_SUCCESS:
        case FETCH_ALL_SOS_CODES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_SOS_CODE_REQUEST:
            return false;
        case CREATE_SOS_CODE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_SOS_CODES_REQUEST:
        case CREATE_SOS_CODE_REQUEST:
            return null;
        case FETCH_ALL_SOS_CODES_FAILURE:
        case CREATE_SOS_CODE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function createdSOSCodeReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_SOS_CODE_REQUEST:
            return 0;
        case CREATE_SOS_CODE_SUCCESS:
            return action.payload.code;
        default:
            return state;
    }
}

function sosCodesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_SOS_CODES_SUCCESS:
            return convertArrToObj(action.payload);
        case CREATE_SOS_CODE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
