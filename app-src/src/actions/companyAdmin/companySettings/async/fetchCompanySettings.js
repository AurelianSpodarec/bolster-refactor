import axios from 'axios';

import {
    FETCH_COMPANY_SETTINGS_REQUEST,
    FETCH_COMPANY_SETTINGS_SUCCESS,
    FETCH_COMPANY_SETTINGS_FAILURE
} from 'constants/actionTypes/companySettings';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanySettingsRequest = () => ({
    type: FETCH_COMPANY_SETTINGS_REQUEST
});

export const fetchCompanySettingsSuccess = payload => ({
    type: FETCH_COMPANY_SETTINGS_SUCCESS,
    payload
});

export const fetchCompanySettingsFailure = error => ({
    type: FETCH_COMPANY_SETTINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanySettingsRequest());

    return axios
        .get(`${API_URL}/settings`, getHeaders())
        .then(res => dispatch(fetchCompanySettingsSuccess(res.data)))
        .catch(err => dispatch(fetchCompanySettingsFailure(err.message)));
};
