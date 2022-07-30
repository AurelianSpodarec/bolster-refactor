import { SET_PIN_OPTIONS_TYPES_SELECTED_TAB_ID } from 'constants/actionTypes/pinOptions';

export default id => dispatch =>
    dispatch({
        type: SET_PIN_OPTIONS_TYPES_SELECTED_TAB_ID,
        id,
    });
