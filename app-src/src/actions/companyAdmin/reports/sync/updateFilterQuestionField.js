import { UPDATE_FILTER_QUESTION_FIELD } from 'constants/actionTypes/reports';

export default (name, value) => async dispatch =>
    await dispatch({
        type: UPDATE_FILTER_QUESTION_FIELD,
        name,
        value
    });
