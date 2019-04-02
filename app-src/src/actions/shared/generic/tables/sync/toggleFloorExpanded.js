import { TOGGLE_FLOOR_EXPANDED } from 'constants/actionTypes/generic';

export default id => dispatch =>
    dispatch({
        type: TOGGLE_FLOOR_EXPANDED,
        id
    });
