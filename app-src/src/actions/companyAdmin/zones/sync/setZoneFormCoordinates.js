import { SET_ZONE_FORM_COORDINATES } from 'constants/actionTypes/zones';

export default coordinates => dispatch =>
    dispatch({
        type: SET_ZONE_FORM_COORDINATES,
        coordinates
    });
