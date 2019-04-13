import { RESET_PIN_ANSWERS } from 'constants/actionTypes/drawings';

export default () => dispatch =>
    dispatch({
        type: RESET_PIN_ANSWERS
    });
