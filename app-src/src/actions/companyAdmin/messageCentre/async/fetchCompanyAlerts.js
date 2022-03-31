import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_COMPANY_ALERTS_REQUEST,
    FETCH_COMPANY_ALERTS_SUCCESS,
    FETCH_COMPANY_ALERTS_FAILURE,
} from 'constants/actionTypes/messageCentre';
import { getHeaders } from 'helpers/api';

export const fetchCompanyAlertsRequest = () => ({
    type: FETCH_COMPANY_ALERTS_REQUEST,
});

export const fetchCompanyAlertsSuccess = payload => ({
    type: FETCH_COMPANY_ALERTS_SUCCESS,
    payload,
});

export const fetchCompanyAlertsFailure = error => ({
    type: FETCH_COMPANY_ALERTS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchCompanyAlertsRequest());

    axios
        .get(`${API_URL}/alertMessages`, getHeaders())
        .then(res => dispatch(fetchCompanyAlertsSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyAlertsFailure(err.message)));
};
