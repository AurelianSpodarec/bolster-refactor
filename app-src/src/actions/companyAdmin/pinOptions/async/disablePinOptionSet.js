import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISABLE_PIN_OPTION_SET_REQUEST,
    DISABLE_PIN_OPTION_SET_SUCCESS,
    DISABLE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const disablePinOptionSetRequest = payload => ({
    type: DISABLE_PIN_OPTION_SET_REQUEST,
    payload,
});

export const disablePinOptionSetSuccess = payload => ({
    type: DISABLE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const disablePinOptionSetFailure = (error, payload) => ({
    type: DISABLE_PIN_OPTION_SET_FAILURE,
    error,
    payload,
});

export default set => async dispatch => {
    dispatch(disablePinOptionSetRequest(set));

    return axios
        .patch(`${API_URL}/pinoptions/sets/${set.id}/disable`, null, getHeaders())
        .then(res => dispatch(disablePinOptionSetSuccess(res.data)))
        .catch(err => dispatch(disablePinOptionSetFailure(err.message, set)));
};
