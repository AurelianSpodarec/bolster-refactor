import { SET_PIN_STATUS_FILTERS } from 'constants/actionTypes/pinTasks';

export default statusType => dispatch =>
    dispatch({
        type: SET_PIN_STATUS_FILTERS,
        statusType,
    });
