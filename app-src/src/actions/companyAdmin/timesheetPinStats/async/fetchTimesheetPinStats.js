import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_TIMESHEET_PIN_STATS_REQUEST,
    FETCH_TIMESHEET_PIN_STATS_SUCCESS,
    FETCH_TIMESHEET_PIN_STATS_FAILURE,
} from 'constants/actionTypes/timesheetPinStats';

export const fetchTimesheetPinStatsRequest = () => ({
    type: FETCH_TIMESHEET_PIN_STATS_REQUEST,
});

export const fetchTimesheetPinStatsSuccess = payload => ({
    type: FETCH_TIMESHEET_PIN_STATS_SUCCESS,
    payload,
});

export const fetchTimesheetPinStatsFailure = error => ({
    type: FETCH_TIMESHEET_PIN_STATS_FAILURE,
    error,
});

export default (userIDs, startDate, endDate) => dispatch => {
    dispatch(fetchTimesheetPinStatsRequest());

    axios
        .post(
            `${API_URL}/stats/user`,
            {
                startDate,
                endDate,
                userIDs,
            },
            getHeaders(),
        )
        .then(res => dispatch(fetchTimesheetPinStatsSuccess(res.data)))
        .catch(err => dispatch(fetchTimesheetPinStatsFailure(err.message)));
};
