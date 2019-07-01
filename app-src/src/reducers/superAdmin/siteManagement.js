import { combineReducers } from 'redux';

import {
    ADMIN_SITE_MANAGEMENT_SELECT_HIERARCHY,
    ADMIN_SITE_MANAGEMENT_SELECT_OPTION
} from 'constants/actionTypes/siteManagement';

export default combineReducers({
    selectedHierarchy: selectedHierarchyReducer,
    selectedOption: selectedOptionReducer
});

function selectedHierarchyReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_SITE_MANAGEMENT_SELECT_HIERARCHY:
            return action.value;
        default:
            return state;
    }
}

function selectedOptionReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_SITE_MANAGEMENT_SELECT_OPTION:
            return action.value;
        default:
            return state;
    }
}
