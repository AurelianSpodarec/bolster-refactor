import { CLIENT_ADD_FILTER_QUESTION } from 'constants/client/actionTypes/clientReports';

export default id => dispatch =>
    dispatch({
        type: CLIENT_ADD_FILTER_QUESTION,
        id
    });
