import { TOGGLE_FILTER_BY_HAS_CLOCKED_IN } from 'constants/actionTypes/timesheets';

export const toggleFilterByHasClockedIn = value => ({
    type: TOGGLE_FILTER_BY_HAS_CLOCKED_IN,
    payload: value,
});
