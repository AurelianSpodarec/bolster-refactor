import { combineReducers } from 'redux';

import {
    FETCH_ALL_DEMO_ACCESS_CODES_REQUEST,
    FETCH_ALL_DEMO_ACCESS_CODES_SUCCESS,
    FETCH_ALL_DEMO_ACCESS_CODES_FAILURE,
    POST_DEMO_ACCESS_CODES_REQUEST,
    POST_DEMO_ACCESS_CODES_SUCCESS,
    POST_DEMO_ACCESS_CODES_FAILURE,
    UPDATE_DEMO_ACCESS_CODES_REQUEST,
    UPDATE_DEMO_ACCESS_CODES_SUCCESS,
    UPDATE_DEMO_ACCESS_CODES_FAILURE,
    DELETE_DEMO_ACCESS_CODES_FAILURE,
    DELETE_DEMO_ACCESS_CODES_SUCCESS,
    DELETE_DEMO_ACCESS_CODES_REQUEST,
    ENABLE_DEMO_ACCESS_CODES_REQUEST,
    DISABLE_DEMO_ACCESS_CODES_REQUEST,
    ENABLE_DEMO_ACCESS_CODES_SUCCESS,
    DISABLE_DEMO_ACCESS_CODES_SUCCESS,
    ENABLE_DEMO_ACCESS_CODES_FAILURE,
    DISABLE_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';
import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';

export default combineReducers({
    demoAccessCodes: demoAccessCodesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    postIsFetching: postDemoAccessCodesFetchingReducer,
    postError: postDemoAccessCodesErrorReducer,
    postSuccess: postDemoAccessCodesSuccessReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_DEMO_ACCESS_CODES_REQUEST:
            return true;
        case FETCH_ALL_DEMO_ACCESS_CODES_SUCCESS:
        case FETCH_ALL_DEMO_ACCESS_CODES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_DEMO_ACCESS_CODES_REQUEST:
            return null;
        case FETCH_ALL_DEMO_ACCESS_CODES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function demoAccessCodesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_DEMO_ACCESS_CODES_SUCCESS:
            return convertArrToObj(action.payload);
        case POST_DEMO_ACCESS_CODES_SUCCESS:
            return { ...state, [action.payload.id]: { ...action.payload } };
        case UPDATE_DEMO_ACCESS_CODES_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case DELETE_DEMO_ACCESS_CODES_SUCCESS:
            return removeObjItem(state, action.id);
        case DISABLE_DEMO_ACCESS_CODES_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        case ENABLE_DEMO_ACCESS_CODES_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}

function postDemoAccessCodesFetchingReducer(state = false, action) {
    switch (action.type) {
        case POST_DEMO_ACCESS_CODES_REQUEST:
        case UPDATE_DEMO_ACCESS_CODES_REQUEST:
        case DELETE_DEMO_ACCESS_CODES_REQUEST:
        case ENABLE_DEMO_ACCESS_CODES_REQUEST:
        case DISABLE_DEMO_ACCESS_CODES_REQUEST:
            return true;
        case POST_DEMO_ACCESS_CODES_SUCCESS:
        case DELETE_DEMO_ACCESS_CODES_SUCCESS:
        case UPDATE_DEMO_ACCESS_CODES_SUCCESS:
        case ENABLE_DEMO_ACCESS_CODES_SUCCESS:
        case DISABLE_DEMO_ACCESS_CODES_SUCCESS:
        case POST_DEMO_ACCESS_CODES_FAILURE:
        case UPDATE_DEMO_ACCESS_CODES_FAILURE:
        case DELETE_DEMO_ACCESS_CODES_FAILURE:
        case ENABLE_DEMO_ACCESS_CODES_FAILURE:
        case DISABLE_DEMO_ACCESS_CODES_FAILURE:
            return false;
        default:
            return state;
    }
}

function postDemoAccessCodesSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_DEMO_ACCESS_CODES_REQUEST:
        case UPDATE_DEMO_ACCESS_CODES_REQUEST:
        case DELETE_DEMO_ACCESS_CODES_REQUEST:
        case ENABLE_DEMO_ACCESS_CODES_REQUEST:
        case DISABLE_DEMO_ACCESS_CODES_REQUEST:
            return false;
        case POST_DEMO_ACCESS_CODES_SUCCESS:
        case UPDATE_DEMO_ACCESS_CODES_SUCCESS:
        case DELETE_DEMO_ACCESS_CODES_SUCCESS:
        case ENABLE_DEMO_ACCESS_CODES_SUCCESS:
        case DISABLE_DEMO_ACCESS_CODES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postDemoAccessCodesErrorReducer(state = false, action) {
    switch (action.type) {
        case POST_DEMO_ACCESS_CODES_REQUEST:
        case UPDATE_DEMO_ACCESS_CODES_REQUEST:
        case DELETE_DEMO_ACCESS_CODES_REQUEST:
        case ENABLE_DEMO_ACCESS_CODES_REQUEST:
        case DISABLE_DEMO_ACCESS_CODES_REQUEST:
            return false;
        case POST_DEMO_ACCESS_CODES_FAILURE:
        case UPDATE_DEMO_ACCESS_CODES_FAILURE:
        case DELETE_DEMO_ACCESS_CODES_FAILURE:
        case ENABLE_DEMO_ACCESS_CODES_FAILURE:
        case DISABLE_DEMO_ACCESS_CODES_FAILURE:
            return true;
        default:
            return state;
    }
}
