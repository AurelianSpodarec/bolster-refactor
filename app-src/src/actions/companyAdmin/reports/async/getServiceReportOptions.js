import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    GET_SERVICE_REPORT_OPTIONS_REQUEST,
    GET_SERVICE_REPORT_OPTIONS_SUCCESS,
    GET_SERVICE_REPORT_OPTIONS_FAILURE,
} from 'constants/actionTypes/reports';

export const getOperativeServiceOptionsRequest = () => ({
    type: GET_SERVICE_REPORT_OPTIONS_REQUEST,
});

export const getOperativeServiceOptionsSuccess = payload => ({
    type: GET_SERVICE_REPORT_OPTIONS_SUCCESS,
    payload,
});

export const getOperativeServiceOptionsFailure = error => ({
    type: GET_SERVICE_REPORT_OPTIONS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(getOperativeServiceOptionsRequest());

    return axios
        .post(`${API_URL}/reports/services`, postBody, getHeaders())
        .then(res => dispatch(getOperativeServiceOptionsSuccess(res.data)))
        .catch(err => dispatch(handleErrors(getOperativeServiceOptionsFailure)(err)));
};
