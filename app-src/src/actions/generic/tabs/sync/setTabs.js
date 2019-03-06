import { SET_TABS } from 'constants/actionTypes/generic';

export default (tabs, selectedTab) => dispatch =>
    dispatch({
        type: SET_TABS,
        tabs,
        selectedTab
    });
