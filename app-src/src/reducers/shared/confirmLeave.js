import { combineReducers } from 'redux';

import { FETCH_DRAWING_TEMPLATES_REQUEST } from 'constants/actionTypes/drawings';
import { CREATE_PIN_SUCCESS } from 'constants/actionTypes/pins';

export default combineReducers({
    confirmLeave: confirmLeaveReducer
});

function confirmLeaveReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DRAWING_TEMPLATES_REQUEST:
            return true;
        case CREATE_PIN_SUCCESS:
            return false;
        default:
            return state;
    }
}
