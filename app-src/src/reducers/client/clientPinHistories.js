import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    CLIENT_FETCH_SINGLE_PIN_SUCCESS,
    CLIENT_SELECT_PIN_HISTORY
} from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    histories: historiesReducer,
    selectedHistoryId: selectedHistoryReducer
});

function historiesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_SINGLE_PIN_SUCCESS:
            return convertArrToObj(action.payload.histories);
        default:
            return state;
    }
}

function selectedHistoryReducer(state = 0, action) {
    switch (action.type) {
        case CLIENT_SELECT_PIN_HISTORY:
            return action.id;
        default:
            return state;
    }
}
