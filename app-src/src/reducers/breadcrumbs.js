import { combineReducers } from 'redux';

import { SET_BREADCRUMBS } from 'constants/actionTypes/generic';

export default combineReducers({
    breadcrumbs: breadcrumbsReducer
});

function breadcrumbsReducer(state = [], action) {
    switch (action.type) {
        case SET_BREADCRUMBS:
            return action.breadcrumbs;
        default:
            return state;
    }
}
