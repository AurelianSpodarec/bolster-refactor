import axios from 'axios';
import { getHeaders } from 'helpers/api';
import {
    SA_FETCH_COMPANY_SUBSCRIPTION_REQUEST,
    SA_FETCH_COMPANY_SUBSCRIPTION_SUCCESS,
    SA_FETCH_COMPANY_SUBSCRIPTION_FAILURE
} from 'constants/actionTypes/superAdminSubscriptions';
import { ADMIN_API_URL } from 'config';

export const saFetchCompanySubscriptionRequest = () => ({
    type: SA_FETCH_COMPANY_SUBSCRIPTION_REQUEST
});

export const saFetchCompanySubscriptionSuccess = payload => ({
    type: SA_FETCH_COMPANY_SUBSCRIPTION_SUCCESS,
    payload
});

export const saFetchCompanySubscriptionFailure = error => ({
    type: SA_FETCH_COMPANY_SUBSCRIPTION_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(saFetchCompanySubscriptionRequest());

    axios
        .get(`${ADMIN_API_URL}/companies/${id}/subscription`, getHeaders())
        .then(res => dispatch(saFetchCompanySubscriptionSuccess(res.data)))
        .catch(err => dispatch(saFetchCompanySubscriptionFailure(err.message)));
};
