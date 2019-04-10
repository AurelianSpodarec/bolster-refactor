import { UPDATE_QUESTION_FIELD } from 'constants/actionTypes/templateBuilder';

export default (name, value) => dispatch =>
    dispatch({
        type: UPDATE_QUESTION_FIELD,
        name,
        value
    });
