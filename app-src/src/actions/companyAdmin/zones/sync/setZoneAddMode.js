import { SET_ZONE_ADD_MODE } from 'constants/actionTypes/zones';

export default value => dispatch =>
    dispatch({
        type: SET_ZONE_ADD_MODE,
        value,
    });
