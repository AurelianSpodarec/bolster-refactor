import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_COMPANY_FAILURE,
    ENABLE_COMPANY_REQUEST,
    ENABLE_COMPANY_SUCCESS,
} from 'constants/actionTypes/companies';

export const enableCompanyRequest = payload => ({
    type: ENABLE_COMPANY_REQUEST,
    payload,
});

export const enableCompanySuccess = payload => ({
    type: ENABLE_COMPANY_SUCCESS,
    payload,
});

export const enableCompanyFailure = (error, payload) => ({
    type: ENABLE_COMPANY_FAILURE,
    error,
    payload,
});

export default company => async dispatch => {
    dispatch(enableCompanyRequest(company));

    return axios
        .patch(`${ADMIN_API_URL}/companies/${company.id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enableCompanySuccess(res.data)))
        .catch(err => dispatch(enableCompanyFailure(err.message, company)));
};
