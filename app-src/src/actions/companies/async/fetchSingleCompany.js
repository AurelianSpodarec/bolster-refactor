import axios from 'axios';

import {
    FETCH_SINGLE_COMPANY_REQUEST,
    FETCH_SINGLE_COMPANY_SUCCESS,
    FETCH_SINGLE_COMPANY_FAILURE
} from 'constants/actionTypes/companies';
import { getHeaders } from 'helpers/api';

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

export default () => dispatch => {
    dispatch(fetchSingleCompanyRequest());

    axios
        .get('/mockData/company/company.json', getHeaders())
        .then(res => dispatch(fetchSingleCompanySuccess(res.data)))
        .catch(err => dispatch(fetchSingleCompanyFailure(err.message)));
};
