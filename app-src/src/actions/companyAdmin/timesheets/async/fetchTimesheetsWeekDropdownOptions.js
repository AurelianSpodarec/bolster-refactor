import axios from 'axios';
import { API_URL } from 'config';

import {
    FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_REQUEST,
    FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_FAILURE,
    FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const fetchTimesheetsWeekDropdownOptionsRequest = () => ({
    type: FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_REQUEST,
});

export const fetchTimesheetsWeekDropdownOptionsSuccess = payload => ({
    type: FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_SUCCESS,
    payload,
});

export const fetchTimesheetsWeekDropdownOptionsFailure = error => ({
    type: FETCH_TIMESHEET_WEEK_DROPDOWN_OPTIONS_FAILURE,
    error,
});

export default startDate => dispatch => {
    dispatch(fetchTimesheetsWeekDropdownOptionsRequest());

    axios
        .post(`${API_URL}/clockerEntries/weekforusers`, { startDate })
        .then(res => dispatch(fetchTimesheetsWeekDropdownOptionsSuccess(res.data)))
        .catch(err => dispatch(fetchTimesheetsWeekDropdownOptionsFailure(err.message)));
};
