import axios from 'axios';

import {
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE
} from 'constants/actionTypes/company';

export const fetchCompanyRequest = () => ({
    type: FETCH_COMPANY_REQUEST
});

export const fetchCompanySuccess = payload => ({
    type: FETCH_COMPANY_SUCCESS,
    payload
});

export const fetchCompanyFailure = error => ({
    type: FETCH_COMPANY_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyRequest());

    axios
        .get('mockData/company/company.json')
        .then(res => dispatch(fetchCompanySuccess(res.data)))
        .catch(err => dispatch(fetchCompanyFailure(err.message)));
};
