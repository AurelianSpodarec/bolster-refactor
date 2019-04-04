import { SET_QUESTION } from 'constants/actionTypes/templateBuilder';

export default question => dispatch =>
    dispatch({
        type: SET_QUESTION,
        question
    });
