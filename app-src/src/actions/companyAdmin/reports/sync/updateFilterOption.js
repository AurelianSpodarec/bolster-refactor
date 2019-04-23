import { UPDATE_FILTER_OPTION } from 'constants/actionTypes/reports';

export default (key, value) => dispatch =>
    dispatch({
        type: UPDATE_FILTER_OPTION,
        key,
        value
    });
