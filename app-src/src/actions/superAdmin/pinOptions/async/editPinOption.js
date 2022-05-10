import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    EDIT_ADMIN_PIN_OPTION_REQUEST,
    EDIT_ADMIN_PIN_OPTION_SUCCESS,
    EDIT_ADMIN_PIN_OPTION_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const editPinOptionValueRequest = () => ({
    type: EDIT_ADMIN_PIN_OPTION_REQUEST,
});

export const editPinOptionValueSuccess = payload => ({
    type: EDIT_ADMIN_PIN_OPTION_SUCCESS,
    payload,
});

export const editPinOptionValueFailure = error => ({
    type: EDIT_ADMIN_PIN_OPTION_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(editPinOptionValueRequest());

    return axios
        .patch(`${ADMIN_API_URL}/pinoptions/options/${id}`, postBody, getHeaders())
        .then(res => dispatch(editPinOptionValueSuccess(res.data)))
        .catch(err => {
            dispatch(handleErrors(editPinOptionValueFailure)(err));
        });
};
