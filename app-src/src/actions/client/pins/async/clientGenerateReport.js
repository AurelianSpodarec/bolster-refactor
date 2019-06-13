import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_SINGLE_PIN_GENERATE_REPORT_REQUEST,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_FAILURE
} from 'constants/client/actionTypes/clientPins';

export const clientSinglePinGenerateReportRequest = () => ({
    type: CLIENT_SINGLE_PIN_GENERATE_REPORT_REQUEST
});

export const clientSinglePinGenerateReportSuccess = payload => ({
    type: CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    payload
});

export const clientSinglePinGenerateReportFailure = error => ({
    type: CLIENT_SINGLE_PIN_GENERATE_REPORT_FAILURE,
    error
});

export default (companyID, pinID) => dispatch => {
    dispatch(clientSinglePinGenerateReportRequest());

    axios
        .post(
            `${CLIENT_API_URL}/pins/${companyID}/${pinID}/report`,
            null,
            getHeaders()
        )
        .then(result =>
            dispatch(clientSinglePinGenerateReportSuccess(result.data))
        )
        .catch(error => {
            dispatch(clientSinglePinGenerateReportFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
