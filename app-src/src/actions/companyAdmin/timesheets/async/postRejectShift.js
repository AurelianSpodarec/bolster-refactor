import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    POST_REJECT_SHIFT_REQUEST,
    POST_REJECT_SHIFT_FAILURE,
    POST_REJECT_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const postRejectShiftRequest = () => ({
    type: POST_REJECT_SHIFT_REQUEST,
});

export const postRejectShiftSuccess = payload => ({
    type: POST_REJECT_SHIFT_SUCCESS,
    payload,
});

export const postRejectShiftFailure = error => ({
    type: POST_REJECT_SHIFT_FAILURE,
    error,
});

export default shiftID => dispatch => {
    dispatch(postRejectShiftRequest());
    axios
        .post(`${API_URL}/clockerEntries/shifts/${shiftID}/reject`, {}, getHeaders())
        .then(res => dispatch(postRejectShiftSuccess(res.data)))
        .catch(err => dispatch(postRejectShiftFailure(err.message)));
};
