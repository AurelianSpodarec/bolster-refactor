import { REMOVE_ALL_EXCLUDED_PINS } from 'constants/actionTypes/reports';

export default () => dispatch =>
    dispatch({
        type: REMOVE_ALL_EXCLUDED_PINS
    });
