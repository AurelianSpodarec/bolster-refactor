import axios from 'axios';
import { API_URL } from 'config';

import {
    FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_REQUEST,
    FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_FAILURE,
    FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_SUCCESS,
} from 'constants/actionTypes/timesheets';
import { getHeaders } from 'helpers/api';

export const fetchTimesheetsWeekDropdownOptionsRequest = () => ({
    type: FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_REQUEST,
});

export const fetchTimesheetsWeekDropdownOptionsSuccess = payload => ({
    type: FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_SUCCESS,
    payload,
});

export const fetchTimesheetsWeekDropdownOptionsFailure = error => ({
    type: FETCH_TIMESHEET_WEEK_PIN_OPTION_TYPES_FAILURE,
    error,
});

export default WeekStartDate => dispatch => {
    dispatch(fetchTimesheetsWeekDropdownOptionsRequest());

    axios
        .post(
            `${API_URL}/clockerentries/usersfortimesheetweek`,
            { WeekStartDate },
            { ...getHeaders() },
        )
        .then(res => dispatch(fetchTimesheetsWeekDropdownOptionsSuccess(res.data)))
        .catch(err => dispatch(fetchTimesheetsWeekDropdownOptionsFailure(err.message)));
};
