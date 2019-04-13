import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_PIN_TEMPLATES_REQUEST,
    FETCH_PIN_TEMPLATES_SUCCESS,
    FETCH_PIN_TEMPLATES_FAILURE
} from 'constants/actionTypes/pins';
import {
    FETCH_DRAWING_TEMPLATES_REQUEST,
    FETCH_DRAWING_TEMPLATES_SUCCESS,
    FETCH_DRAWING_TEMPLATES_FAILURE
} from 'constants/actionTypes/drawings';
import {
    FETCH_ALL_TEMPLATES_REQUEST,
    FETCH_ALL_TEMPLATES_SUCCESS,
    FETCH_ALL_TEMPLATES_FAILURE
} from 'constants/actionTypes/templates';

export default combineReducers({
    templates: templatesReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_REQUEST:
        case FETCH_DRAWING_TEMPLATES_REQUEST:
        case FETCH_ALL_TEMPLATES_REQUEST:
            return true;
        case FETCH_PIN_TEMPLATES_SUCCESS:
        case FETCH_PIN_TEMPLATES_FAILURE:
        case FETCH_DRAWING_TEMPLATES_SUCCESS:
        case FETCH_DRAWING_TEMPLATES_FAILURE:
        case FETCH_ALL_TEMPLATES_SUCCESS:
        case FETCH_ALL_TEMPLATES_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_REQUEST:
        case FETCH_DRAWING_TEMPLATES_REQUEST:
        case FETCH_ALL_TEMPLATES_REQUEST:
            return null;
        case FETCH_PIN_TEMPLATES_FAILURE:
        case FETCH_DRAWING_TEMPLATES_FAILURE:
        case FETCH_ALL_TEMPLATES_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function templatesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
        case FETCH_DRAWING_TEMPLATES_SUCCESS:
        case FETCH_ALL_TEMPLATES_SUCCESS:
            return convertArrToObj(action.payload.templates);
        default:
            return state;
    }
}
