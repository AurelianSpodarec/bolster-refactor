import { REORDER_PIN_OPTION_VALUES } from 'constants/actionTypes/pinOptions';

export default payload => dispatch =>
    dispatch({
        type: REORDER_PIN_OPTION_VALUES,
        payload,
    });
