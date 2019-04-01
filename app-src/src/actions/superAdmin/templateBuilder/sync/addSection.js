import { ADD_SECTION } from 'constants/actionTypes/templateBuilder';

export default section => dispatch =>
    dispatch({
        type: ADD_SECTION,
        section
    });
