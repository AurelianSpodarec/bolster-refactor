import { CLIENT_UPDATE_OPERATIVE_FILTER } from 'constants/client/actionTypes/clientReports';

export default value => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_OPERATIVE_FILTER,
        value
    });
