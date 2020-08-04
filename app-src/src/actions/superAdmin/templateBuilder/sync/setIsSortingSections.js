import { SET_IS_SORTING_SECTIONS } from 'constants/actionTypes/templateBuilder';

export default payload => dispatch =>
    dispatch({
        type: SET_IS_SORTING_SECTIONS,
        payload,
    });
