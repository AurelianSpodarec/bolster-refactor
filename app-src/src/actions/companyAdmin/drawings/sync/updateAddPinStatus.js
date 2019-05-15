import { UPDATE_ADD_PIN_STATUS } from 'constants/actionTypes/drawings';

export default value => dispatch =>
    dispatch({
        type: UPDATE_ADD_PIN_STATUS,
        value
    });
