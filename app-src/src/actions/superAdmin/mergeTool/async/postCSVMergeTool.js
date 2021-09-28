import axios from 'axios';

import {
    ADMIN_MERGE_TOOL_CSV_REQUEST,
    ADMIN_MERGE_TOOL_CSV_SUCCESS,
    ADMIN_MERGE_TOOL_CSV_FAILURE,
} from 'constants/actionTypes/pins';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const adminFetchPinsForCompanyRequest = () => ({
    type: ADMIN_MERGE_TOOL_CSV_REQUEST,
});

export const adminFetchPinsForCompanySuccess = payload => ({
    type: ADMIN_MERGE_TOOL_CSV_SUCCESS,
    payload,
});

export const adminFetchPinsForCompanyFailure = error => ({
    type: ADMIN_MERGE_TOOL_CSV_FAILURE,
    error,
});

export default sourceDrawingID => dispatch => {
    dispatch(adminFetchPinsForCompanyRequest());

    return axios
        .post(`${ADMIN_API_URL}/drawings/pins/${sourceDrawingID}`, {}, getHeaders())
        .then(res => dispatch(adminFetchPinsForCompanySuccess(res.data)))
        .catch(err => dispatch(adminFetchPinsForCompanyFailure(err.message)));
};
