import { CLIENT_UPDATE_REPORT_FILTER } from 'constants/client/actionTypes/clientReports';

export default (name, value) => async dispatch =>
    await dispatch({
        type: CLIENT_UPDATE_REPORT_FILTER,
        name,
        value
    });
