import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISABLE_COMPANY_FAILURE,
    DISABLE_COMPANY_REQUEST,
    DISABLE_COMPANY_SUCCESS,
} from 'constants/actionTypes/companies';

export const disableCompanyRequest = payload => ({
    type: DISABLE_COMPANY_REQUEST,
    payload,
});

export const disableCompanySuccess = payload => ({
    type: DISABLE_COMPANY_SUCCESS,
    payload,
});

export const disableCompanyFailure = (error, payload) => ({
    type: DISABLE_COMPANY_FAILURE,
    error,
    payload,
});

export default company => async dispatch => {
    dispatch(disableCompanyRequest(company));

    return axios
        .patch(`${ADMIN_API_URL}/companies/${company.id}/disable`, null, getHeaders())
        .then(res => dispatch(disableCompanySuccess(res.data)))
        .catch(err => dispatch(disableCompanyFailure(err.message, company)));
};
