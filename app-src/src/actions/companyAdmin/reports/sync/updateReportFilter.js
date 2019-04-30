import { UPDATE_REPORT_FILTER } from 'constants/actionTypes/reports';

export default (name, value) => async dispatch =>
    await dispatch({
        type: UPDATE_REPORT_FILTER,
        name,
        value
    });
