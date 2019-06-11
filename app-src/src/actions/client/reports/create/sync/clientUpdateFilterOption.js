import { CLIENT_UPDATE_FILTER_OPTION } from 'constants/client/actionTypes/clientReports';

export default (key, value) => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_FILTER_OPTION,
        key,
        value
    });
