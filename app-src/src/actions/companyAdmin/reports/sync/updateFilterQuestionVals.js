import { UPDATE_FILTER_QUESTION_VALS } from 'constants/actionTypes/reports';

export default (id, selected) => async dispatch =>
    await dispatch({
        type: UPDATE_FILTER_QUESTION_VALS,
        id,
        selected
    });
