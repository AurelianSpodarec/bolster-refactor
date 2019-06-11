import { CLIENT_UPDATE_FILTER_QUESTION_FIELD } from 'constants/client/actionTypes/clientReports';

export default (name, value) => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_FILTER_QUESTION_FIELD,
        name,
        value
    });
