import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import { CLIENT_FETCH_SINGLE_PIN_SUCCESS } from 'constants/client/actionTypes/clientPins';

export default combineReducers({
    histories: historiesReducer
});

function historiesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_SINGLE_PIN_SUCCESS:
            return convertArrToObj(action.payload.histories);
        default:
            return state;
    }
}
