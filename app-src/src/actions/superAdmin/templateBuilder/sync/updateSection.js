import { UPDATE_SECTION } from 'constants/actionTypes/templateBuilder';

export default section => dispatch =>
    dispatch({
        type: UPDATE_SECTION,
        section
    });
