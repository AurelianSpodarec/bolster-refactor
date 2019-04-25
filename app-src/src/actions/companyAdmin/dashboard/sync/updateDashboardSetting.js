import { UPDATE_DASHBOARD_SETTING } from 'constants/actionTypes/dashboard';

export default (key, value) => dispatch =>
    dispatch({ type: UPDATE_DASHBOARD_SETTING, key, value });
