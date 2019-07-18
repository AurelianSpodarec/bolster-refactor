import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import { UPDATE_SITES_FILTERS } from 'constants/actionTypes/sites';

export default combineReducers({
    filters: filtersReducer
});

function filtersReducer(
    state = { name: '', status: '', sortBy: 'default' },
    action
) {
    switch (action.type) {
        case UPDATE_SITES_FILTERS:
            return updateObj(state, action.fieldName, action.searchTerm);
        default:
            return state;
    }
}
