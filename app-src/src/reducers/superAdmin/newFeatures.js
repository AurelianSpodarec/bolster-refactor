import { combineReducers } from 'redux';
import {
    FETCH_ALL_NEW_FEATURES_REQUEST,
    FETCH_ALL_NEW_FEATURES_SUCCESS,
    FETCH_ALL_NEW_FEATURES_FAILURE,
    ADD_NEW_FEATURE_REQUEST,
    ADD_NEW_FEATURE_SUCCESS,
    ADD_NEW_FEATURE_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    isFetching: isFetchingReducer,
    error: errorReducer,
    newFeatures: newFeaturesReducer,
    postSuccess: postSuccessReducer,
    addedNewFeature: addedNewFeatureReducer,
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
        case ADD_NEW_FEATURE_REQUEST:
            return null;
        case FETCH_ALL_NEW_FEATURES_FAILURE:
        case ADD_NEW_FEATURE_FAILURE:
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADD_NEW_FEATURE_REQUEST:
            return false;
        case ADD_NEW_FEATURE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function addedNewFeatureReducer(state = 0, action) {
    switch (action.type) {
        case ADD_NEW_FEATURE_REQUEST:
            return 0;
        case ADD_NEW_FEATURE_SUCCESS:
            return updateObj(action.payload);
        default:
            return state;
    }
}
