import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';

import {
    CLIENT_FETCH_DRAWING_TEMPLATES_REQUEST,
    CLIENT_FETCH_DRAWING_TEMPLATES_SUCCESS,
    CLIENT_FETCH_DRAWING_TEMPLATES_FAILURE
} from 'constants/client/actionTypes/clienDrawings';

export default combineReducers({
    templates: templatesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_FETCH_DRAWING_TEMPLATES_REQUEST:
            return true;
        case CLIENT_FETCH_DRAWING_TEMPLATES_SUCCESS:
        case CLIENT_FETCH_DRAWING_TEMPLATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CLIENT_FETCH_DRAWING_TEMPLATES_REQUEST:
            return null;
        case CLIENT_FETCH_DRAWING_TEMPLATES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function templatesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_DRAWING_TEMPLATES_SUCCESS:
            return convertArrToObj(action.payload.templates);
        default:
            return state;
    }
}
