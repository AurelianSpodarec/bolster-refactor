import { REORDER_DROPDOWN_OPTIONS } from 'constants/actionTypes/dropdownOptions';

export default (id, hoverIndex) => dispatch =>
    dispatch({
        type: REORDER_DROPDOWN_OPTIONS,
        id,
        hoverIndex,
    });
