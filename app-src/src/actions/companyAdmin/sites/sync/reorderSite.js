import { REORDER_SITE } from 'constants/actionTypes/sites';

export default (id, hoverIndex) => dispatch =>
    dispatch({
        type: REORDER_SITE,
        id,
        hoverIndex
    });
