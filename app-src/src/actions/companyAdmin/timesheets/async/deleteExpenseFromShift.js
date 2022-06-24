import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    DELETE_EXPENSE_FROM_SHIFT_REQUEST,
    DELETE_EXPENSE_FROM_SHIFT_FAILURE,
    DELETE_EXPENSE_FROM_SHIFT_SUCCESS,
} from 'constants/actionTypes/timesheets';

export const deleteExpenseFromShiftRequest = () => ({
    type: DELETE_EXPENSE_FROM_SHIFT_REQUEST,
});

export const deleteExpenseFromShiftSuccess = payload => ({
    type: DELETE_EXPENSE_FROM_SHIFT_SUCCESS,
    payload,
});

export const deleteExpenseFromShiftFailure = error => ({
    type: DELETE_EXPENSE_FROM_SHIFT_FAILURE,
    error,
});

export default (shiftID, expenseID) => dispatch => {
    dispatch(deleteExpenseFromShiftRequest());
    axios
        .delete(`${API_URL}/clockerEntries/shifts/${shiftID}/expenses/${expenseID}`, getHeaders())
        .then(res => dispatch(deleteExpenseFromShiftSuccess(res.data)))
        .catch(err => dispatch(deleteExpenseFromShiftFailure(err.message)));
};
