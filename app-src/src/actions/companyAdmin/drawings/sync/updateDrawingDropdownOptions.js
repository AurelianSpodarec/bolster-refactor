import { UPDATE_DRAWING_DROPDOWN_OPTIONS } from 'constants/actionTypes/drawings';

export default options => dispatch =>
    dispatch({
        type: UPDATE_DRAWING_DROPDOWN_OPTIONS,
        options,
    });
