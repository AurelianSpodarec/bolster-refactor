import { REORDER_MANUFACTURERS } from 'constants/actionTypes/dropdownOptions';

export default (payload, type) => dispatch =>
    dispatch({
        type: REORDER_MANUFACTURERS,
        payload,
        pinOptionType: type,
    });
