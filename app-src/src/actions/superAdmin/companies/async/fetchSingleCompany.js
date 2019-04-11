import axios from 'axios';

import {
    FETCH_SINGLE_COMPANY_REQUEST,
    FETCH_SINGLE_COMPANY_SUCCESS,
    FETCH_SINGLE_COMPANY_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';
import { getHeaders } from 'helpers/api';
import { ADMIN_API_URL } from 'config';

export const fetchSingleCompanyRequest = () => ({
    type: FETCH_SINGLE_COMPANY_REQUEST
});

export const fetchSingleCompanySuccess = payload => ({
    type: FETCH_SINGLE_COMPANY_SUCCESS,
    payload
});

export const fetchSingleCompanyFailure = error => ({
    type: FETCH_SINGLE_COMPANY_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchSingleCompanyRequest());

    axios
        .get(`${ADMIN_API_URL}/companies/${id}`, getHeaders())
        .then(res => dispatch(fetchSingleCompanySuccess(res.data)))
        .catch(err => dispatch(fetchSingleCompanyFailure(err.message)));
};
