import axios from 'axios';

import {
    SA_TOGGLE_COMPANY_ON_CLIENT_LIST_REQUEST,
    SA_TOGGLE_COMPANY_ON_CLIENT_LIST_SUCCESS,
    SA_TOGGLE_COMPANY_ON_CLIENT_LIST_FAILURE,
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const saToggleCompanyOnClientListRequest = () => ({
    type: SA_TOGGLE_COMPANY_ON_CLIENT_LIST_REQUEST,
});

export const saToggleCompanyOnClientListSuccess = payload => ({
    type: SA_TOGGLE_COMPANY_ON_CLIENT_LIST_SUCCESS,
    payload,
});

export const saToggleCompanyOnClientListFailure = error => ({
    type: SA_TOGGLE_COMPANY_ON_CLIENT_LIST_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(saToggleCompanyOnClientListRequest());

    return axios
        .post(`${ADMIN_API_URL}/companies/toggleCompany`, postBody, getHeaders())
        .then(({ data }) => dispatch(saToggleCompanyOnClientListSuccess(data)))
        .catch(err => dispatch(saToggleCompanyOnClientListFailure(err.message)));
};
