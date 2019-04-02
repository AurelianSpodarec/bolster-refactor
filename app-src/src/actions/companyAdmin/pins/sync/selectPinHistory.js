import { SELECT_PIN_HISTORY } from 'constants/actionTypes/pins';

export default id => dispatch =>
    dispatch({
        type: SELECT_PIN_HISTORY,
        id
    });
