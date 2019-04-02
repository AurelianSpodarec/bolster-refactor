import { TOGGLE_BUILDING_EXPANDED } from 'constants/actionTypes/generic';

export default id => dispatch =>
    dispatch({
        type: TOGGLE_BUILDING_EXPANDED,
        id
    });
