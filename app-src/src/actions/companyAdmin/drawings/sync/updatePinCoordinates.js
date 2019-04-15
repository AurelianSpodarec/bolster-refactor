import { UPDATE_PIN_COORDINATES } from 'constants/actionTypes/drawings';

export default (latX, lngX) => dispatch =>
    dispatch({
        type: UPDATE_PIN_COORDINATES,
        latX,
        lngX
    });
