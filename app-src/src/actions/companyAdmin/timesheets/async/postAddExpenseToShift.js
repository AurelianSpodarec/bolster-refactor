import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    POST_ADD_EXPENSE_TO_SHIFT_REQUEST,
    POST_ADD_EXPENSE_TO_SHIFT_FAILURE,
    POST_ADD_EXPENSE_TO_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const postAddExpenseToShiftRequest = () => ({
    type: POST_ADD_EXPENSE_TO_SHIFT_REQUEST,
});

export const postAddExpenseToShiftSuccess = payload => ({
    type: POST_ADD_EXPENSE_TO_SHIFT_SUCCESS,
    payload,
});

export const postAddExpenseToShiftFailure = error => ({
    type: POST_ADD_EXPENSE_TO_SHIFT_FAILURE,
    error,
});

export default shiftID => dispatch => {
    dispatch(postAddExpenseToShiftRequest());
    axios
        .post(`${API_URL}/clockerEntries/shifts/${shiftID}/expenses`, {}, getHeaders())
        .then(res => dispatch(postAddExpenseToShiftSuccess(res.data)))
        .catch(err => dispatch(postAddExpenseToShiftFailure(err.message)));
};
