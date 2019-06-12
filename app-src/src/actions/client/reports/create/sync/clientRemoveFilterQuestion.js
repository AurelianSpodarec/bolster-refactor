import { CLIENT_REMOVE_FILTER_QUESTION } from 'constants/client/actionTypes/clientReports';

export default id => dispatch =>
    dispatch({
        type: CLIENT_REMOVE_FILTER_QUESTION,
        id
    });
