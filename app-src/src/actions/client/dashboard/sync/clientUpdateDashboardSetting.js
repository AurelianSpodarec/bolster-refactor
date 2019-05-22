import { CLIENT_UPDATE_DASHBOARD_SETTING } from 'constants/client/actionTypes/clientDashboard';

export default (key, value) => dispatch =>
    dispatch({ type: CLIENT_UPDATE_DASHBOARD_SETTING, key, value });
