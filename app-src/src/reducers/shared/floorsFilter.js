import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import { UPDATE_FLOORS_FILTERS } from 'constants/actionTypes/floors';

export default combineReducers({
    filters: filtersReducer,
});

function filtersReducer(state = { status: '' }, action) {
    switch (action.type) {
        case UPDATE_FLOORS_FILTERS:
            return updateObj(state, action.fieldName, action.value);
        default:
            return state;
    }
}
