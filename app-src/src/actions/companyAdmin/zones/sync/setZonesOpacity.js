import { SET_ZONES_OPACITY } from 'constants/actionTypes/zones';

export default value => dispatch =>
    dispatch({
        type: SET_ZONES_OPACITY,
        value,
    });
