import axios from 'axios';

import {
    FETCH_SUPER_ADMIN_TIMESHEETS_FAILURE,
    FETCH_SUPER_ADMIN_TIMESHEETS_REQUEST,
    FETCH_SUPER_ADMIN_TIMESHEETS_SUCCESS,
} from 'constants/actionTypes/superAdminTimesheets';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchSuperAdminTimesheetsRequest = () => ({
    type: FETCH_SUPER_ADMIN_TIMESHEETS_REQUEST,
});
export const fetchSuperAdminTimesheetsSuccess = payload => ({
    type: FETCH_SUPER_ADMIN_TIMESHEETS_SUCCESS,
    payload,
});
export const fetchSuperAdminTimesheetsFailure = error => ({
    type: FETCH_SUPER_ADMIN_TIMESHEETS_FAILURE,
    error,
});

const fetchSuperAdminTimesheets = queryParams => dispatch => {
    const { page, pageSize, order, startDate } = queryParams;

    dispatch(fetchSuperAdminTimesheetsRequest());

    return axios
        .get(
            `${ADMIN_API_URL}/timesheets?page=${page}&pageSize=${pageSize}&sortOrder=${order}&startDate=${startDate}`,
            getHeaders(),
        )
        .then(({ data }) => dispatch(fetchSuperAdminTimesheetsSuccess(data)))
        .catch(err => dispatch(fetchSuperAdminTimesheetsFailure(err.message)));
};

export default fetchSuperAdminTimesheets;
