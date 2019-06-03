import { RESET_FILTER_OPTIONS } from 'constants/actionTypes/reports';

export default () => dispatch =>
    dispatch({
        type: RESET_FILTER_OPTIONS
    });
