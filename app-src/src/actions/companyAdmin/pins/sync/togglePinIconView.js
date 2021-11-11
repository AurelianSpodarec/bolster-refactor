import { TOGGLE_PIN_VIEW_MODE } from 'constants/actionTypes/pins';

export default () => dispatch =>
    dispatch({
        type: TOGGLE_PIN_VIEW_MODE,
    });
