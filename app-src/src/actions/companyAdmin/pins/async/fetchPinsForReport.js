import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PINS_FOR_REPORT_REQUEST,
    FETCH_PINS_FOR_REPORT_SUCCESS,
    FETCH_PINS_FOR_REPORT_FAILURE,
} from 'constants/actionTypes/pins';

export const fetchPinsForReportRequest = () => ({
    type: FETCH_PINS_FOR_REPORT_REQUEST,
});

export const fetchPinsForReportSuccess = payload => ({
    type: FETCH_PINS_FOR_REPORT_SUCCESS,
    payload,
});

export const fetchPinsForReportFailure = error => ({
    type: FETCH_PINS_FOR_REPORT_FAILURE,
    error,
});

export default (type, id) => dispatch => {
    dispatch(fetchPinsForReportRequest(type, id));

    return axios
        .get(`${API_URL}/pins/${type}/${id}`, getHeaders())
        .then(res => dispatch(fetchPinsForReportSuccess(res.data)))
        .catch(err => dispatch(fetchPinsForReportFailure(err.message)));
};
