import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE
} from 'constants/actionTypes/reports';

export const deleteReportRequest = () => ({
    type: DELETE_REPORT_REQUEST
});

export const deleteReportSuccess = payload => ({
    type: DELETE_REPORT_SUCCESS,
    payload
});

export const deleteReportFailure = error => ({
    type: DELETE_REPORT_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(deleteReportRequest());

    return axios
        .get(`${API_URL}/reports/${id}`, getHeaders())
        .then(({ data }) => {
            return dispatch(deleteReportSuccess(data));
        })
        .catch(err => {
            return dispatch(handleErrors(deleteReportFailure)(err));
        });
};
