import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_TIMESHEET_WEEK_REQUEST,
    FETCH_TIMESHEET_WEEK_FAILURE,
    FETCH_TIMESHEET_WEEK_SUCCESS,
} from 'constants/actionTypes/timesheets';
import { arrayToQueryString } from 'helpers/generic';

export const fetchTimesheetsWeekRequest = () => ({
    type: FETCH_TIMESHEET_WEEK_REQUEST,
});

export const fetchTimesheetsWeekSuccess = payload => ({
    type: FETCH_TIMESHEET_WEEK_SUCCESS,
    payload,
});

export const fetchTimesheetsWeekFailure = error => ({
    type: FETCH_TIMESHEET_WEEK_FAILURE,
    error,
});

export default (userIDs, startDate) => dispatch => {
    dispatch(fetchTimesheetsWeekRequest());
    console.log(userIDs);
    axios
        .get(`${API_URL}/clockerEntries/weekforusers?${arrayToQueryString(userIDs, 'ids')}`, {
            ...getHeaders(),
            params: {
                date: startDate,
                ids: userIDs,
            },
        })
        .then(res => dispatch(fetchTimesheetsWeekSuccess(res.data)))
        .catch(err => dispatch(fetchTimesheetsWeekFailure(err.message)));
};
