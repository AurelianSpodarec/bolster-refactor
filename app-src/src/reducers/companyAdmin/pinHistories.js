import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import { FETCH_SINGLE_PIN_SUCCESS } from 'constants/actionTypes/pins';

export default combineReducers({
    histories: historiesReducer
});

function historiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_SUCCESS:
            return action.isForDrawing
                ? { ...state, ...convertArrToObj(action.payload.histories) }
                : convertArrToObj(action.payload.histories, 'id');
        default:
            return state;
    }
}
