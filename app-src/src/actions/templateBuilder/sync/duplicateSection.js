import { DUPLICATE_QUESTIONS } from 'constants/actionTypes//templateBuilder';

export default section => dispatch =>
    dispatch({
        type: DUPLICATE_QUESTIONS,
        section
    });
