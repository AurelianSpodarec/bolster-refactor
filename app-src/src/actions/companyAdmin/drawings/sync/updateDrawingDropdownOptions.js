import { UPDATE_DRAWING_PIN_OPTION_TYPES } from 'constants/actionTypes/drawings';

export default options => dispatch =>
    dispatch({
        type: UPDATE_DRAWING_PIN_OPTION_TYPES,
        options,
    });
