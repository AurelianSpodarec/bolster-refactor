import { RESET_QUESTION_FIELDS } from 'constants/actionTypes/templateBuilder';

export default () => dispatch =>
    dispatch({
        type: RESET_QUESTION_FIELDS
    });
