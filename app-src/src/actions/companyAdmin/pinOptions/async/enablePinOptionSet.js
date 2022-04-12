import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_PIN_OPTION_SET_REQUEST,
    ENABLE_PIN_OPTION_SET_SUCCESS,
    ENABLE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const enablePinOptionSetRequest = payload => ({
    type: ENABLE_PIN_OPTION_SET_REQUEST,
    payload,
});

export const enablePinOptionSetSuccess = payload => ({
    type: ENABLE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const enablePinOptionSetFailure = (error, payload) => ({
    type: ENABLE_PIN_OPTION_SET_FAILURE,
    error,
    payload,
});

export default set => async dispatch => {
    dispatch(enablePinOptionSetRequest(set));

    return axios
        .patch(`${API_URL}/pinoptions/sets/${set.id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enablePinOptionSetSuccess(res.data)))
        .catch(err => dispatch(enablePinOptionSetFailure(err.message, set)));
};
