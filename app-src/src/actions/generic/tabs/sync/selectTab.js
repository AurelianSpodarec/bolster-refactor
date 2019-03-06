import { SELECT_TAB } from 'constants/actionTypes/generic';

export default selectedTab => dispatch =>
    dispatch({
        type: SELECT_TAB,
        selectedTab
    });
