import { REORDER_DRAWING } from 'constants/actionTypes/drawings';

export default (id, hoverIndex) => dispatch =>
    dispatch({
        type: REORDER_DRAWING,
        id,
        hoverIndex
    });
