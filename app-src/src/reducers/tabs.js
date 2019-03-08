import { combineReducers } from 'redux';

import { SET_TABS, SELECT_TAB } from 'constants/actionTypes/generic';

export default combineReducers({
    tabs: tabsReducer,
    selectedTab: selectedTabReducer
});

function tabsReducer(state = [], action) {
    switch (action.type) {
        case SET_TABS:
            return action.tabs;
        default:
            return state;
    }
}

function selectedTabReducer(state = '', action) {
    switch (action.type) {
        case SET_TABS:
        case SELECT_TAB:
            return action.selectedTab;
        default:
            return state;
    }
}
