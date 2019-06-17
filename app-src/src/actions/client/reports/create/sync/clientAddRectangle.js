import { CLIENT_ADD_RECTANGLE } from 'constants/client/actionTypes/clientReports';

export default (id, topLeft, bottomRight) => dispatch =>
    dispatch({
        type: CLIENT_ADD_RECTANGLE,
        id,
        topLeft,
        bottomRight
    });
