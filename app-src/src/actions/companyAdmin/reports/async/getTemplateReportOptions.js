import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    GET_TEMPLATE_REPORT_OPTIONS_REQUEST,
    GET_TEMPLATE_REPORT_OPTIONS_SUCCESS,
    GET_TEMPLATE_REPORT_OPTIONS_FAILURE
} from 'constants/actionTypes/reports';

export const getOperativeOptionsRequest = () => ({
    type: GET_TEMPLATE_REPORT_OPTIONS_REQUEST
});

export const getOperativeOptionsSuccess = payload => ({
    type: GET_TEMPLATE_REPORT_OPTIONS_SUCCESS,
    payload
});

export const getOperativeOptionsFailure = error => ({
    type: GET_TEMPLATE_REPORT_OPTIONS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(getOperativeOptionsRequest());

    return axios
        .post(`${API_URL}/reports/templates`, postBody, getHeaders())
        .then(res => dispatch(getOperativeOptionsSuccess(res.data)))
        .catch(err => dispatch(handleErrors(getOperativeOptionsFailure)(err)));
};
