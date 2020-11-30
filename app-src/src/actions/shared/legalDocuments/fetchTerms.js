import axios from 'axios';

import {
    SHARED_FETCH_TERMS_REQUEST,
    SHARED_FETCH_TERMS_SUCCESS,
    SHARED_FETCH_TERMS_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { getHeaders } from 'helpers/api';
import { FRONTEND_API_URL } from 'config';

const fetchTermsRequest = () => ({
    type: SHARED_FETCH_TERMS_REQUEST,
});

const fetchTermsSuccess = payload => ({
    type: SHARED_FETCH_TERMS_SUCCESS,
    payload,
});

const fetchTermsFailure = error => ({
    type: SHARED_FETCH_TERMS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchTermsRequest());

    return axios
        .get(`${FRONTEND_API_URL}/legal-documents/terms`, getHeaders())
        .then(res => dispatch(fetchTermsSuccess(res.data)))
        .catch(err => dispatch(fetchTermsFailure(err.message)));
};
