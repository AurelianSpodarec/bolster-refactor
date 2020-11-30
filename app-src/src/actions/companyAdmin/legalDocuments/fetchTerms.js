import axios from 'axios';

import {
    COMPANY_FETCH_TERMS_REQUEST,
    COMPANY_FETCH_TERMS_SUCCESS,
    COMPANY_FETCH_TERMS_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

const fetchTermsRequest = () => ({
    type: COMPANY_FETCH_TERMS_REQUEST,
});

const fetchTermsSuccess = payload => ({
    type: COMPANY_FETCH_TERMS_SUCCESS,
    payload,
});

const fetchTermsFailure = error => ({
    type: COMPANY_FETCH_TERMS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchTermsRequest());

    return axios
        .get(`${API_URL}/legal-documents/terms`, getHeaders())
        .then(res => dispatch(fetchTermsSuccess(res.data)))
        .catch(err => dispatch(fetchTermsFailure(err.message)));
};
