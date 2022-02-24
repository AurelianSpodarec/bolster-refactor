import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import { UPDATE_DRAWINGS_FILTERS } from 'constants/actionTypes/drawings';

export default combineReducers({
    filters: filtersReducer,
});

function filtersReducer(state = { status: '' }, action) {
    switch (action.type) {
        case UPDATE_DRAWINGS_FILTERS:
            return updateObj(state, action.fieldName, action.value);
        default:
            return state;
    }
}
