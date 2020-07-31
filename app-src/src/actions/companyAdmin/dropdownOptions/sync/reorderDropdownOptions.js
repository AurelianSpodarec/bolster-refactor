import { REORDER_DROPDOWN_OPTIONS } from 'constants/actionTypes/dropdownOptions';

export default payload => dispatch =>
    dispatch({
        type: REORDER_DROPDOWN_OPTIONS,
        payload,
    });
