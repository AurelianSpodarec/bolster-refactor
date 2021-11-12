import axios from 'axios';

import {
    FETCH_DRAWING_ZONES_FOR_REPORT_REQUEST,
    FETCH_DRAWING_ZONES_FOR_REPORT_SUCCESS,
    FETCH_DRAWING_ZONES_FOR_REPORT_FAILURE,
} from 'constants/actionTypes/zones';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const fetchDrawingZonesForReportRequest = () => ({
    type: FETCH_DRAWING_ZONES_FOR_REPORT_REQUEST,
});

export const fetchDrawingZonesForReportSuccess = payload => ({
    type: FETCH_DRAWING_ZONES_FOR_REPORT_SUCCESS,
    payload,
});

export const fetchDrawingZonesForReportFailure = error => ({
    type: FETCH_DRAWING_ZONES_FOR_REPORT_FAILURE,
    error,
});

export default drawingID => dispatch => {
    dispatch(fetchDrawingZonesForReportRequest());
    return axios
        .get(`${API_URL}/drawings/${drawingID}/zones`, getHeaders())
        .then(({ data }) => dispatch(fetchDrawingZonesForReportSuccess(data)))
        .catch(err => dispatch(handleErrors(fetchDrawingZonesForReportFailure)(err)));
};
