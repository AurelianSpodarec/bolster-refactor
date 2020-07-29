import { REORDER_FLOORS } from 'constants/actionTypes/floors';

export default payload => dispatch =>
    dispatch({
        type: REORDER_FLOORS,
        payload,
    });
