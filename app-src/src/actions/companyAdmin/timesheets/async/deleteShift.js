import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    DELETE_SHIFT_REQUEST,
    DELETE_SHIFT_FAILURE,
    DELETE_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const deleteShiftRequest = () => ({
    type: DELETE_SHIFT_REQUEST,
});

export const deleteShiftSuccess = payload => ({
    type: DELETE_SHIFT_SUCCESS,
    payload,
});

export const deleteShiftFailure = error => ({
    type: DELETE_SHIFT_FAILURE,
    error,
});

export default shiftID => dispatch => {
    dispatch(deleteShiftRequest());
    axios
        .delete(`${API_URL}/clockerEntries/shifts/${shiftID}`, getHeaders())
        .then(res => dispatch(deleteShiftSuccess(res.data)))
        .catch(err => dispatch(deleteShiftFailure(err.message)));
};
