import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    GENERATE_QR_CODES_REQUEST,
    GENERATE_QR_CODES_SUCCESS,
    GENERATE_QR_CODES_FAILURE
} from 'constants/actionTypes/qrCodes';

export const generateQRCodesRequest = () => ({
    type: GENERATE_QR_CODES_REQUEST
});

export const generateQRCodesSuccess = payload => ({
    type: GENERATE_QR_CODES_SUCCESS,
    payload,
    success: true,
});

export const generateQRCodesFailure = error => ({
    type: GENERATE_QR_CODES_FAILURE,
    error
});

export default numberOfCodes => dispatch => {
    dispatch(generateQRCodesRequest());

    axios
        .get(`${API_URL}/companies/qrCodes?numberOfCodes=${numberOfCodes}`, getHeaders())
        .then(res => dispatch(generateQRCodesSuccess(res.data)))
        .catch(err => dispatch(generateQRCodesFailure(err.message)));
};
