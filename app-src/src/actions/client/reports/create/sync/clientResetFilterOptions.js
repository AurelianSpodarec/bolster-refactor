import { CLIENT_RESET_FILTER_OPTIONS } from 'constants/client/actionTypes/clientReports';

export default () => dispatch =>
    dispatch({
        type: CLIENT_RESET_FILTER_OPTIONS
    });
