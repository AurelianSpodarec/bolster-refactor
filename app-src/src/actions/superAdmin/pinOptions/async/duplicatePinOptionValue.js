import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DUPLICATE_ADMIN_PIN_OPTION_VALUE_REQUEST,
    DUPLICATE_ADMIN_PIN_OPTION_VALUE_SUCCESS,
    DUPLICATE_ADMIN_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const duplicatePinOptionSetRequest = () => ({
    type: DUPLICATE_ADMIN_PIN_OPTION_VALUE_REQUEST,
});

export const duplicatePinOptionSetSuccess = payload => ({
    type: DUPLICATE_ADMIN_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const duplicatePinOptionSetFailure = error => ({
    type: DUPLICATE_ADMIN_PIN_OPTION_VALUE_FAILURE,
    error,
});

export default (optionID, postBody) => async dispatch => {
    dispatch(duplicatePinOptionSetRequest());

    return axios
        .post(`${ADMIN_API_URL}/pinoptions/options/${optionID}/duplicate`, postBody, getHeaders())
        .then(res => dispatch(duplicatePinOptionSetSuccess(res.data)))
        .catch(err => dispatch(duplicatePinOptionSetFailure(err.message)));
};
