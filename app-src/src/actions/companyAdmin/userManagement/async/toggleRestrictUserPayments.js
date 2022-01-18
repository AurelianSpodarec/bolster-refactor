import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    TOGGLE_RESTRICT_USER_PAYMENTS_REQUEST,
    TOGGLE_RESTRICT_USER_PAYMENTS_SUCCESS,
    TOGGLE_RESTRICT_USER_PAYMENTS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const toggleRestrictUserPaymentsRequest = () => ({
    type: TOGGLE_RESTRICT_USER_PAYMENTS_REQUEST
});

export const toggleRestrictUserPaymentsSuccess = payload => ({
    type: TOGGLE_RESTRICT_USER_PAYMENTS_SUCCESS,
    payload
});

export const toggleRestrictUserPaymentsFailure = error => ({
    type: TOGGLE_RESTRICT_USER_PAYMENTS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(toggleRestrictUserPaymentsRequest());

    return axios
        .post(`${API_URL}/users/restrictPayments`, postBody, getHeaders())
        .then(res => dispatch(toggleRestrictUserPaymentsSuccess(res.data)))
        .catch(error => {
            dispatch(toggleRestrictUserPaymentsFailure(error.message));
        });
};
