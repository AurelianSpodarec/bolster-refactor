import { UPDATE_ADD_PIN_ANSWER } from 'constants/actionTypes/drawings';

export default (key, value) => dispatch =>
    dispatch({
        type: UPDATE_ADD_PIN_ANSWER,
        key,
        value
    });
