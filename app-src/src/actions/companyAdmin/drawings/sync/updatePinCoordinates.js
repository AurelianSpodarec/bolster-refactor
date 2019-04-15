import { UPDATE_PIN_COORDINATES } from 'constants/actionTypes/drawings';

export default (name, value) => dispatch =>
    dispatch({
        type: UPDATE_PIN_COORDINATES,
        name,
        value
    });
