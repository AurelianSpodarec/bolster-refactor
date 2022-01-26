import { SET_PIN_RECURRENCE_FILTERS } from 'constants/actionTypes/pinTasks';

export default recurrenceType => dispatch =>
    dispatch({
        type: SET_PIN_RECURRENCE_FILTERS,
        recurrenceType,
    });
