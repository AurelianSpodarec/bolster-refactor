import { UPDATE_QUESTION_FIELDS } from 'constants/actionTypes/templateBuilder';

export default fields => dispatch =>
    dispatch({
        type: UPDATE_QUESTION_FIELDS,
        fields
    });
