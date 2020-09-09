import { combineReducers } from 'redux';
import {
    FETCH_ALL_NEW_FEATURES_REQUEST,
    FETCH_ALL_NEW_FEATURES_SUCCESS,
    FETCH_ALL_NEW_FEATURES_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    newFeatures: newFeaturesReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_ALL_NEW_FEATURES_REQUEST:
            return true;
        case FETCH_ALL_NEW_FEATURES_SUCCESS:
        case FETCH_ALL_NEW_FEATURES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_ALL_NEW_FEATURES_REQUEST:
            return null;
        case FETCH_ALL_NEW_FEATURES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function newFeaturesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_NEW_FEATURES_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}
