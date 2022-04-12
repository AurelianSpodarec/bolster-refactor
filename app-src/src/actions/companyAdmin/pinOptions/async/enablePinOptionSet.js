import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ENABLE_PIN_OPTION_SET_REQUEST,
    ENABLE_PIN_OPTION_SET_SUCCESS,
    ENABLE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const enablePinOptionSetRequest = () => ({
    type: ENABLE_PIN_OPTION_SET_REQUEST,
});

export const enablePinOptionSetSuccess = payload => ({
    type: ENABLE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const enablePinOptionSetFailure = error => ({
    type: ENABLE_PIN_OPTION_SET_FAILURE,
    error,
});

export default id => async dispatch => {
    dispatch(enablePinOptionSetRequest());

    return axios
        .patch(`${API_URL}/pinoptions/sets/${id}/disable?undo=true`, null, getHeaders())
        .then(res => dispatch(enablePinOptionSetSuccess(res.data)))
        .catch(err => dispatch(enablePinOptionSetFailure(err.message)));
};
