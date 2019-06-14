import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    SINGLE_PIN_GENERATE_REPORT_REQUEST,
    SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    SINGLE_PIN_GENERATE_REPORT_FAILURE
} from 'constants/actionTypes/pins';

export const singlePinGenerateReportRequest = () => ({
    type: SINGLE_PIN_GENERATE_REPORT_REQUEST
});

export const singlePinGenerateReportSuccess = payload => ({
    type: SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    payload
});

export const singlePinGenerateReportFailure = error => ({
    type: SINGLE_PIN_GENERATE_REPORT_FAILURE,
    error
});

export default pinID => dispatch => {
    dispatch(singlePinGenerateReportRequest());

    axios
        .post(`${API_URL}/pins/${pinID}/report`, null, getHeaders())
        .then(result => dispatch(singlePinGenerateReportSuccess(result.data)))
        .catch(error => {
            dispatch(singlePinGenerateReportFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
