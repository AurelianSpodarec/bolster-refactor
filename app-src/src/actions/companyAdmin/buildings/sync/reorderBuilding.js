import { REORDER_BUILDING } from 'constants/actionTypes/buildings';

export default (id, hoverIndex) => dispatch =>
    dispatch({
        type: REORDER_BUILDING,
        id,
        hoverIndex
    });
