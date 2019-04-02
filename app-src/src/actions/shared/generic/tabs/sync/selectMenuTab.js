import { SELECT_MENU_TAB } from 'constants/actionTypes/generic';

export default selectedMenuTab => dispatch =>
    dispatch({
        type: SELECT_MENU_TAB,
        selectedMenuTab
    });
