import { DELETE_SECTION } from 'constants/actionTypes/templateBuilder';

export default uuid => dispatch =>
    dispatch({
        type: DELETE_SECTION,
        uuid
    });
