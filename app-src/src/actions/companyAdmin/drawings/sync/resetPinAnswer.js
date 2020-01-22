import { RESET_PIN_ANSWER } from 'constants/actionTypes/drawings';

export default (id, value) => dispatch =>
    dispatch({
        type: RESET_PIN_ANSWER,
        id,
        value
    });
