import { TOGGLE_PIN_VIEW_MODE } from 'constants/actionTypes/pins';

export default value => dispatch =>
    dispatch({
        type: TOGGLE_PIN_VIEW_MODE,
        value,
    });
