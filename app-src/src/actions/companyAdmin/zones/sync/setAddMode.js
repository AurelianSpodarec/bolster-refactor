import { SET_ADD_MODE } from 'constants/actionTypes/zones';

export default value => dispatch =>
    dispatch({
        type: SET_ADD_MODE,
        value,
    });
