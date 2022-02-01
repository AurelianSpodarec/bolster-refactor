import { CHANGE_BOOL } from 'constants/actionTypes/stats';

export default payload => dispatch =>
    dispatch({
        type: CHANGE_BOOL,
        payload,
    });
