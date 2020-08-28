import axios from 'axios';

import {
    COMPANY_AGREE_TO_TERMS_REQUEST,
    COMPANY_AGREE_TO_TERMS_SUCCESS,
    COMPANY_AGREE_TO_TERMS_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

const agreeToTermsRequest = () => ({
    type: COMPANY_AGREE_TO_TERMS_REQUEST,
});

const agreeToTermsSuccess = payload => ({
    type: COMPANY_AGREE_TO_TERMS_SUCCESS,
    payload,
});

const agreeToTermsFailure = error => ({
    type: COMPANY_AGREE_TO_TERMS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(agreeToTermsRequest());

    try {
        const { data } = await axios.patch(`${API_URL}/legal-documents/terms`, {}, getHeaders());
        dispatch(agreeToTermsSuccess(data));
    } catch (err) {
        dispatch(agreeToTermsFailure(err.message));
    }
};
