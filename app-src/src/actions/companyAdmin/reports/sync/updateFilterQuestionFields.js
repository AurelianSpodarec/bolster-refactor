import { UPDATE_FILTER_QUESTION_FIELDS } from 'constants/actionTypes/reports';

export default fields => dispatch =>
    dispatch({
        type: UPDATE_FILTER_QUESTION_FIELDS,
        fields
    });
