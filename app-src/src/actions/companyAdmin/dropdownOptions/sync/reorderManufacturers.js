import { REORDER_MANUFACTURERS } from 'constants/actionTypes/dropdownOptions';

export default payload => dispatch =>
    dispatch({
        type: REORDER_MANUFACTURERS,
        payload,
    });
