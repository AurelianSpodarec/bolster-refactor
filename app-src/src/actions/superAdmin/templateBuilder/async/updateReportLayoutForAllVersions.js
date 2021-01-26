import axios from 'axios';

import {
    UPDATE_REPORT_LAYOUT_ALL_VERSIONS_REQUEST,
    UPDATE_REPORT_LAYOUT_ALL_VERSIONS_SUCCESS,
    UPDATE_REPORT_LAYOUT_ALL_VERSIONS_FAILURE,
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const updateReportLayoutAllVersionsRequest = () => ({
    type: UPDATE_REPORT_LAYOUT_ALL_VERSIONS_REQUEST,
});

export const updateReportLayoutAllVersionsSuccess = () => ({
    type: UPDATE_REPORT_LAYOUT_ALL_VERSIONS_SUCCESS,
});

export const updateReportLayoutAllVersionsFailure = error => ({
    type: UPDATE_REPORT_LAYOUT_ALL_VERSIONS_FAILURE,
    error,
});

export default (templateID, postBody) => dispatch => {
    dispatch(updateReportLayoutAllVersionsRequest());

    return axios
        .patch(`${ADMIN_API_URL}/templates/edit/${templateID}`, postBody, getHeaders())
        .then(res => dispatch(updateReportLayoutAllVersionsSuccess(res.data)))
        .catch(err => dispatch(updateReportLayoutAllVersionsFailure(err)));
};
