import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_SINGLE_PIN_REQUEST,
    FETCH_SINGLE_PIN_SUCCESS
} from 'constants/actionTypes/pins';

export default combineReducers({
    histories: historiesReducer
});

// ** If for drawing, the histories are used in the pin hover function to fetch the photos for the pin. Retains the data for the pin so that hovering over a pin repeatedly will only fetch data once.

function historiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_REQUEST:
            return action.isForDrawing ? state : {};
        case FETCH_SINGLE_PIN_SUCCESS:
            return action.isForDrawing
                ? { ...state, ...convertArrToObj(action.payload.histories) }
                : convertArrToObj(action.payload.histories, 'id');
        default:
            return state;
    }
}
