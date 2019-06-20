import { SET_MOBILE } from 'constants/actionTypes/generic';

export default isMobile => async dispatch =>
    await dispatch({
        type: SET_MOBILE,
        isMobile
    });
