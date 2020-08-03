import { SWAP_QUESTION_SORTS } from 'constants/actionTypes/templateBuilder';

export default payload => dispatch =>
    dispatch({
        type: SWAP_QUESTION_SORTS,
        payload,
    });
