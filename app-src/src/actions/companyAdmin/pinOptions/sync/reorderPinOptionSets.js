import { REORDER_PIN_OPTION_SETS } from 'constants/actionTypes/pinOptions';

export default payload => dispatch =>
    dispatch({
        type: REORDER_PIN_OPTION_SETS,
        payload,
    });
