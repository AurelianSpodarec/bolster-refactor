import { REORDER_PIN_OPTION_TYPES } from 'constants/actionTypes/dropdownOptions';

export default payload => dispatch =>
    dispatch({
        type: REORDER_PIN_OPTION_TYPES,
        payload,
    });
