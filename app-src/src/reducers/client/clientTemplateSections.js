import { combineReducers } from 'redux';

import { CLIENT_FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/client/actionTypes/clientPins';
import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_TEMPLATES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload.sections) };
        default:
            return state;
    }
}
