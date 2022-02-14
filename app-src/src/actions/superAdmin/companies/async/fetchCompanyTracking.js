import {
    FETCH_COMPANY_TRACKING_REQUEST,
    FETCH_COMPANY_TRACKING_SUCCESS,
    FETCH_COMPANY_TRACKING_FAILURE,
} from 'constants/actionTypes/companies';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyTrackingRequest = () => ({
    type: FETCH_COMPANY_TRACKING_REQUEST,
});

export const fetchCompanyTrackingSuccess = payload => ({
    type: FETCH_COMPANY_TRACKING_SUCCESS,
    payload,
});

export const fetchCompanyTrackingFailure = error => ({
    type: FETCH_COMPANY_TRACKING_FAILURE,
    error,
});

export default ({ dateFrom, dateTo }) => dispatch => {
    dispatch(fetchCompanyTrackingRequest());

    return axios
        .get(
            `${ADMIN_API_URL}/companies/subscriptions?dateFrom=${dateFrom}&dateTo=${dateTo}`,
            getHeaders(),
        )
        .then(res => dispatch(fetchCompanyTrackingSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyTrackingFailure(err.message)));
};
