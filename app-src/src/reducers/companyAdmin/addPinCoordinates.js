import { combineReducers } from 'redux';
import { UPDATE_PIN_COORDINATES } from 'constants/actionTypes/drawings';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    coordinates: coordinatesReducer
});

function coordinatesReducer(state = { lat: '', lng: '' }, action) {
    switch (action.type) {
        case UPDATE_PIN_COORDINATES:
            return updateObj(state, action.name, action.value);
        default:
            return state;
    }
}
