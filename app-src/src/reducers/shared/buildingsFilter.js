import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import { UPDATE_BUILDINGS_FILTERS } from 'constants/actionTypes/buildings';

export default combineReducers({
    filters: filtersReducer,
});

function filtersReducer(state = { status: '' }, action) {
    switch (action.type) {
        case UPDATE_BUILDINGS_FILTERS:
            return updateObj(state, action.fieldName, action.value);
        default:
            return state;
    }
}
