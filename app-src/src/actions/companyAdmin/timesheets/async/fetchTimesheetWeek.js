import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_TIMESHEET_WEEK_REQUEST,
    FETCH_TIMESHEET_WEEK_FAILURE,
    FETCH_TIMESHEET_WEEK_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const fetchTimesheetWeekRequest = () => ({
    type: FETCH_TIMESHEET_WEEK_REQUEST,
});

export const fetchTimesheetWeekSuccess = payload => ({
    type: FETCH_TIMESHEET_WEEK_SUCCESS,
    payload,
});

export const fetchTimesheetWeekFailure = error => ({
    type: FETCH_TIMESHEET_WEEK_FAILURE,
    error,
});

export default (userID, startDate) => dispatch => {
    dispatch(fetchTimesheetWeekRequest());

    axios
        .get(`${API_URL}/clockerEntries/${userID}/week`, {
            ...getHeaders(),
            params: {
                date: startDate,
            },
        })
        .then(res => dispatch(fetchTimesheetWeekSuccess(res.data)))
        .catch(err => dispatch(fetchTimesheetWeekFailure(err.message)));
};
