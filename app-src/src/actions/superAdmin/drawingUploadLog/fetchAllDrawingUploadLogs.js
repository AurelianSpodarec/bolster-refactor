import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import {
    FETCH_ALL_DRAWINGS_UPLOAD_LOGS_FAILURE,
    FETCH_ALL_DRAWINGS_UPLOAD_LOGS_REQUEST,
    FETCH_ALL_DRAWINGS_UPLOAD_LOGS_SUCCESS,
} from 'constants/actionTypes/drawingUploadLogs';
import { getHeaders } from 'helpers/api';

export const fetchDrawingUploadLogsRequest = () => ({
    type: FETCH_ALL_DRAWINGS_UPLOAD_LOGS_REQUEST,
});

export const fetchDrawingUploadLogsSuccess = payload => ({
    type: FETCH_ALL_DRAWINGS_UPLOAD_LOGS_SUCCESS,
    payload,
});

export const fetchDrawingUploadLogsFailure = error => ({
    type: FETCH_ALL_DRAWINGS_UPLOAD_LOGS_FAILURE,
    error,
});

export default (page, pageSize) => dispatch => {
    dispatch(fetchDrawingUploadLogsRequest());

    return axios
        .get(`${ADMIN_API_URL}/drawinguploads?page=${page}&pageSize=${pageSize}`, getHeaders())
        .then(({ data }) => dispatch(fetchDrawingUploadLogsSuccess(data)))
        .catch(err => dispatch(fetchDrawingUploadLogsFailure(err.message)));
};
