import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISABLE_ADMIN_PIN_OPTION_VALUE_REQUEST,
    DISABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS,
    DISABLE_ADMIN_PIN_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const disablePinOptionValueRequest = payload => ({
    type: DISABLE_ADMIN_PIN_OPTION_VALUE_REQUEST,
    payload,
});

export const disablePinOptionValueSuccess = payload => ({
    type: DISABLE_ADMIN_PIN_OPTION_VALUE_SUCCESS,
    payload,
});

export const disablePinOptionValueFailure = (error, payload) => ({
    type: DISABLE_ADMIN_PIN_OPTION_VALUE_FAILURE,
    error,
    payload,
});

export default option => async dispatch => {
    dispatch(disablePinOptionValueRequest(option));

    return axios
        .patch(`${ADMIN_API_URL}/pinoptions/options/${option.id}/disable`, null, getHeaders())
        .then(res => dispatch(disablePinOptionValueSuccess(res.data)))
        .catch(err => dispatch(disablePinOptionValueFailure(err.message, option)));
};
