import { CLIENT_REMOVE_ALL_RECTANGLES } from 'constants/client/actionTypes/clientReports';

export default () => dispatch =>
    dispatch({
        type: CLIENT_REMOVE_ALL_RECTANGLES
    });
