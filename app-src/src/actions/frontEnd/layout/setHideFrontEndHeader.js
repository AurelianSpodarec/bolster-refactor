import { SET_HIDE_FRONT_END_HEADER } from 'constants/actionTypes/generic';

export default (hidden = false) => dispatch =>
    dispatch({
        type: SET_HIDE_FRONT_END_HEADER,
        hidden
    });
