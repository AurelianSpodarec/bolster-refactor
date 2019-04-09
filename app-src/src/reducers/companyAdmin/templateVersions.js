import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';

export default combineReducers({
    versions: versionsReducer
});

function versionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
            return convertArrToObj(action.payload.versions);
        default:
            return state;
    }
}
