import { ADD_QUESTION } from 'constants/actionTypes//templateBuilder';

export default question => dispatch =>
    dispatch({
        type: ADD_QUESTION,
        question
    });
