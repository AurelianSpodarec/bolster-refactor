import { combineReducers } from 'redux';

import {
    POST_DEMO_FULL_SITE_REQUEST,
    POST_DEMO_FULL_SITE_SUCCESS,
    POST_DEMO_FULL_SITE_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

export default combineReducers({
    postIsFetching: postDemoFullSiteFetchingReducer,
    postError: postDemoFullSiteErrorReducer,
    postSuccess: postDemoFullSiteSuccessReducer,
});

function postDemoFullSiteFetchingReducer(state = false, action) {
    switch (action.type) {
        case POST_DEMO_FULL_SITE_REQUEST:
            return true;
        case POST_DEMO_FULL_SITE_SUCCESS:
        case POST_DEMO_FULL_SITE_FAILURE:
            return false;
        default:
            return state;
    }
}

function postDemoFullSiteSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_DEMO_FULL_SITE_REQUEST:
            return false;
        case POST_DEMO_FULL_SITE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function postDemoFullSiteErrorReducer(state = false, action) {
    switch (action.type) {
        case POST_DEMO_FULL_SITE_REQUEST:
            return false;
        case POST_DEMO_FULL_SITE_FAILURE:
            return true;
        default:
            return state;
    }
}
