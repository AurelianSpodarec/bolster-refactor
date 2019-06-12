import { CLIENT_UPDATE_FILTER_QUESTION_FIELDS } from 'constants/client/actionTypes/clientReports';

export default fields => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_FILTER_QUESTION_FIELDS,
        fields
    });
