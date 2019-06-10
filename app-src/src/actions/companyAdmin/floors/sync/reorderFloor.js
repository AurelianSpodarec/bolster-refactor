import { REORDER_FLOORS } from 'constants/actionTypes/floors';

export default (id, hoverIndex) => dispatch =>
    dispatch({
        type: REORDER_FLOORS,
        id,
        hoverIndex
    });
