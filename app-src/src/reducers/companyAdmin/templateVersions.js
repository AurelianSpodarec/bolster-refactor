import { combineReducers } from 'redux';

import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';
import { FETCH_DRAWING_TEMPLATES_SUCCESS } from 'constants/actionTypes/drawings';
import { FETCH_ALL_TEMPLATES_SUCCESS } from 'constants/actionTypes/templates';

export default combineReducers({
    versions: versionsReducer
});

function versionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
        case FETCH_DRAWING_TEMPLATES_SUCCESS:
        case FETCH_ALL_TEMPLATES_SUCCESS:
            return { ...state, ...action.payload.versions };
        default:
            return state;
    }
}
