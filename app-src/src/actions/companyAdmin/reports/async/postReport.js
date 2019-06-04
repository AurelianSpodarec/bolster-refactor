import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    POST_REPORT_REQUEST,
    POST_REPORT_SUCCESS,
    POST_REPORT_FAILURE
} from 'constants/actionTypes/reports';

export const postReportRequest = () => ({
    type: POST_REPORT_REQUEST
});

export const postReportSuccess = payload => ({
    type: POST_REPORT_SUCCESS,
    payload
});

export const postReportFailure = error => ({
    type: POST_REPORT_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(postReportRequest());

    return axios
        .post(`${API_URL}/reports`, postBody, getHeaders())
        .then(res => dispatch(postReportSuccess(res.data)))
        .catch(err => {
            dispatch(handleErrors(postReportFailure)(err));
        });
};
