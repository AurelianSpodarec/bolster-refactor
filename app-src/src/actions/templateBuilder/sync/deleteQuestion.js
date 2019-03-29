import { DELETE_QUESTION } from 'constants/actionTypes/templateBuilder';

export default uuid => dispatch =>
    dispatch({
        type: DELETE_QUESTION,
        uuid
    });
