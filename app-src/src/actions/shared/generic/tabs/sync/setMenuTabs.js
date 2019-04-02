import { SET_MENU_TABS } from 'constants/actionTypes/generic';

export default (tabs, selectedTab) => dispatch =>
    dispatch({
        type: SET_MENU_TABS,
        tabs,
        selectedTab
    });
