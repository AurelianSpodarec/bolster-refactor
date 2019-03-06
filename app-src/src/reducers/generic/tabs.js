import { SET_TABS, SELECT_TAB } from 'constants/actionTypes/generic';

const initialState = {
    tabs: [],
    selectedTab: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TABS:
            return {
                tabs: action.tabs,
                selectedTab: action.selectedTab
            };
        case SELECT_TAB:
            return {
                ...state,
                selectedTab: action.selectedTab
            };
        default:
            return state;
    }
};
