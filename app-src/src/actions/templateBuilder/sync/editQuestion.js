import { EDIT_QUESTION } from 'constants/actionTypes//templateBuilder';

export default question => dispatch =>
    dispatch({
        type: EDIT_QUESTION,
        question
    });
