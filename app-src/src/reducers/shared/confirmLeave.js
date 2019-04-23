import { combineReducers } from 'redux';

import { FETCH_DRAWING_TEMPLATES_REQUEST } from 'constants/actionTypes/drawings';
import {
    CREATE_PIN_SUCCESS,
    EDIT_PIN_HISTORY_SUCCESS
} from 'constants/actionTypes/pins';

export default combineReducers({
    confirmLeave: confirmLeaveReducer
});

function confirmLeaveReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DRAWING_TEMPLATES_REQUEST:
            return true;
        case CREATE_PIN_SUCCESS:
        case EDIT_PIN_HISTORY_SUCCESS:
            return false;
        default:
            return state;
    }
}
