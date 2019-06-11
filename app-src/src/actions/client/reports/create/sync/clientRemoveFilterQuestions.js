import { CLIENT_REMOVE_FILTER_QUESTIONS } from 'constants/client/actionTypes/clientReports';

export default () => dispatch =>
    dispatch({
        type: CLIENT_REMOVE_FILTER_QUESTIONS
    });
