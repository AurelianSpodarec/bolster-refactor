import axios from 'axios';

import {
    FETCH_BUG_REPORTS_FAILURE,
    FETCH_BUG_REPORTS_REQUEST,
    FETCH_BUG_REPORTS_SUCCESS,
} from 'constants/actionTypes/bugReports';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchBugReportsListRequest = () => ({
    type: FETCH_BUG_REPORTS_REQUEST,
});

export const fetchBugReportsListSuccess = payload => ({
    type: FETCH_BUG_REPORTS_SUCCESS,
    payload,
});

export const fetchBugReportsListFailure = error => ({
    type: FETCH_BUG_REPORTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchBugReportsListRequest());

    return axios
        .get(`${ADMIN_API_URL}/bugReports`, getHeaders())
        .then(res => dispatch(fetchBugReportsListSuccess(res.data)))
        .catch(err => dispatch(fetchBugReportsListFailure(err.message)));
};
