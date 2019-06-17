import { CLIENT_REMOVE_ALL_EXCLUDED_PINS } from 'constants/client/actionTypes/clientReports';

export default () => dispatch =>
    dispatch({
        type: CLIENT_REMOVE_ALL_EXCLUDED_PINS
    });
