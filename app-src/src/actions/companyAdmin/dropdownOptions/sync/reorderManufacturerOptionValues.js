import { REORDER_MANUFACTURER_OPTION_VALUES } from 'constants/actionTypes/dropdownOptions';

export default (payload, manufacturerID) => dispatch =>
    dispatch({
        type: REORDER_MANUFACTURER_OPTION_VALUES,
        payload,
        manufacturerID,
    });
