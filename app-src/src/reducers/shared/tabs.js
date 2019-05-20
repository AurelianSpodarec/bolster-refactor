import { combineReducers } from 'redux';

import {
    SET_TABS,
    SELECT_TAB,
    SET_MENU_TABS,
    SELECT_MENU_TAB
} from 'constants/actionTypes/generic';

export default combineReducers({
    tabs: tabsReducer,
    selectedTab: selectedTabReducer,
    menuTabs: menuTabsReducer,
    selectedMenuTab: selectedMenuTabReducer
});

function tabsReducer(state = [], action) {
    switch (action.type) {
        case SET_TABS:
            return action.tabs;
        default:
            return state;
    }
}
function menuTabsReducer(
    state = ['Super Admin', 'Company Admin', 'Client'],
    action
) {
    switch (action.type) {
        case SET_MENU_TABS:
            return action.menuTabs;
        default:
            return state;
    }
}

function selectedMenuTabReducer(state = 'Company Admin', action) {
    switch (action.type) {
        case SET_MENU_TABS:
        case SELECT_MENU_TAB:
            return action.selectedMenuTab;
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
