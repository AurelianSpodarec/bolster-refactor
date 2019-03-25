import { DUPLICATE_SECTION } from 'constants/actionTypes//templateBuilder';

export default section => dispatch =>
    dispatch({
        type: DUPLICATE_SECTION,
        section
    });
