import axios from 'axios';

import { CLIENT_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CLIENT_POST_REPORT_REQUEST,
    CLIENT_POST_REPORT_SUCCESS,
    CLIENT_POST_REPORT_NO_PINS,
    CLIENT_POST_REPORT_FAILURE
} from 'constants/client/actionTypes/clientReports';

export const clientPostReportRequest = () => ({
    type: CLIENT_POST_REPORT_REQUEST
});

export const clientPostReportSuccess = payload => ({
    type: CLIENT_POST_REPORT_SUCCESS,
    payload
});
export const clientPostReportNoPind = payload => ({
    type: CLIENT_POST_REPORT_NO_PINS,
    payload
});

export const clientPostReportFailure = error => ({
    type: CLIENT_POST_REPORT_FAILURE,
    error
});

export default (companyID, postBody) => dispatch => {
    dispatch(clientPostReportRequest());

    return axios
        .post(`${CLIENT_API_URL}/reports/${companyID}`, postBody, getHeaders())
        .then(({ status, data }) => {
            if (status === 202) {
                // no pins returned, display modal
                dispatch(clientPostReportFailure({ status, ...data }));
            } else {
                // actual success
                dispatch(clientPostReportSuccess(data));
            }
        })
        .catch(err => {
            dispatch(handleErrors(clientPostReportFailure)(err));
        });
};
