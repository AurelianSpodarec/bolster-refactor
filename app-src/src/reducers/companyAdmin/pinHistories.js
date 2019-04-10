import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_SINGLE_PIN_SUCCESS,
    SELECT_PIN_HISTORY
} from 'constants/actionTypes/pins';

export default combineReducers({
    histories: historiesReducer,
    selectedHistoryId: selectedHistoryReducer
});

function historiesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SINGLE_PIN_SUCCESS:
            return convertArrToObj(action.payload.histories);
        default:
            return state;
    }
}

function selectedHistoryReducer(state = 0, action) {
    switch (action.type) {
        case SELECT_PIN_HISTORY:
            return action.id;
        default:
            return state;
    }
}
