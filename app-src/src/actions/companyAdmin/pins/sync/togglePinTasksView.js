import { TOGGLE_PIN_TASKS_MODE } from 'constants/actionTypes/pins';

export default () => dispatch =>
    dispatch({
        type: TOGGLE_PIN_TASKS_MODE,
    });
