import { SET_SECTION } from 'constants/actionTypes/templateBuilder';

export default section => dispatch =>
    dispatch({
        type: SET_SECTION,
        section
    });
