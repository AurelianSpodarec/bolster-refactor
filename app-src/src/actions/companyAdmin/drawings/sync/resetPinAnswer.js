import { RESET_PIN_ANSWER } from 'constants/actionTypes/drawings';

export default id => dispatch =>
    dispatch({
        type: RESET_PIN_ANSWER,
        id
    });
