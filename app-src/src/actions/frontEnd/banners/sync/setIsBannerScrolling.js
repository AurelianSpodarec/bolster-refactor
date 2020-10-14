import { SET_IS_BANNER_SCROLLING } from 'constants/actionTypes/generic';

export default value => dispatch =>
    dispatch({
        type: SET_IS_BANNER_SCROLLING,
        value,
    });
