import { CLIENT_REMOVE_RECTANGLE } from 'constants/client/actionTypes/clientReports';

export default id => dispatch =>
    dispatch({
        type: CLIENT_REMOVE_RECTANGLE,
        id
    });
