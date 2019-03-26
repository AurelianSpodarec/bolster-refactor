import { RENAME_SECTION } from 'constants/actionTypes/templateBuilder';

export default uuid => dispatch =>
    dispatch({
        type: RENAME_SECTION,
        uuid
    });
