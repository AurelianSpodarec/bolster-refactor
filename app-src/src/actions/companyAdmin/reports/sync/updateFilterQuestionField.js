import { UPDATE_FILTER_QUESTION_FIELD } from 'constants/actionTypes/reports';

export default (name, value) => dispatch =>
    dispatch({
        type: UPDATE_FILTER_QUESTION_FIELD,
        name,
        value
    });
