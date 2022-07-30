import { UPDATE_ADD_PIN_MEASUREMENT } from 'constants/actionTypes/drawings';

export default (questionID, value) => dispatch =>
    dispatch({
        type: UPDATE_ADD_PIN_MEASUREMENT,
        questionID,
        value,
    });
