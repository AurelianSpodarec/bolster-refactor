import { REORDER_BUILDING } from 'constants/actionTypes/buildings';

export default payload => dispatch =>
    dispatch({
        type: REORDER_BUILDING,
        payload,
    });
