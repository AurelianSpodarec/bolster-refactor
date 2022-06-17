import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    POST_OVERRIDE_SHIFT_REQUEST,
    POST_OVERRIDE_SHIFT_FAILURE,
    POST_OVERRIDE_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const postOverrideShiftRequest = () => ({
    type: POST_OVERRIDE_SHIFT_REQUEST,
});

export const postOverrideShiftSuccess = payload => ({
    type: POST_OVERRIDE_SHIFT_SUCCESS,
    payload,
});

export const postOverrideShiftFailure = error => ({
    type: POST_OVERRIDE_SHIFT_FAILURE,
    error,
});

export default (shiftID, postBody) => dispatch => {
    dispatch(postOverrideShiftRequest());
    axios
        .post(`${API_URL}/clockerEntries/shifts/${shiftID}/override`, postBody, getHeaders())
        .then(res => dispatch(postOverrideShiftSuccess(res.data)))
        .catch(err => dispatch(postOverrideShiftFailure(err.message)));
};
