import { TOGGLE_DRAWING_EXPANDED } from 'constants/actionTypes/generic';

export default id => dispatch =>
    dispatch({
        type: TOGGLE_DRAWING_EXPANDED,
        id
    });
