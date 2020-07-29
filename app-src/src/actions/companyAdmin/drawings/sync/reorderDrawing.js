import { REORDER_DRAWING } from 'constants/actionTypes/drawings';

export default payload => dispatch =>
    dispatch({
        type: REORDER_DRAWING,
        payload,
    });
