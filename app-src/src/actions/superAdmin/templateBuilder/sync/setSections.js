import { SET_SECTIONS } from 'constants/actionTypes/templateBuilder';

export default sections => dispatch =>
    dispatch({
        type: SET_SECTIONS,
        sections,
    });
