import { combineReducers } from 'redux';

import { CLIENT_FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/client/actionTypes/clientPins';

import { convertArrToObj } from 'helpers/generic';

export default combineReducers({
    versions: versionsReducer
});

function versionsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_FETCH_PIN_TEMPLATES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload.versions) };
        default:
            return state;
    }
}
