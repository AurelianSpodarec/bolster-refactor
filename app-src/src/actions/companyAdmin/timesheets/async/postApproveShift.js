import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    POST_APPROVE_SHIFT_REQUEST,
    POST_APPROVE_SHIFT_FAILURE,
    POST_APPROVE_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const postApproveShiftRequest = () => ({
    type: POST_APPROVE_SHIFT_REQUEST,
});

export const postApproveShiftSuccess = payload => ({
    type: POST_APPROVE_SHIFT_SUCCESS,
    payload,
});

export const postApproveShiftFailure = error => ({
    type: POST_APPROVE_SHIFT_FAILURE,
    error,
});

export default shiftID => dispatch => {
    dispatch(postApproveShiftRequest());
    axios
        .post(`${API_URL}/clockerEntries/shifts/${shiftID}/approve`, {}, getHeaders())
        .then(res => dispatch(postApproveShiftSuccess(res.data)))
        .catch(err => dispatch(postApproveShiftFailure(err.message)));
};
