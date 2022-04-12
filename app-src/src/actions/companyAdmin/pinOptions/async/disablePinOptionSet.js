import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DISABLE_PIN_OPTION_SET_REQUEST,
    DISABLE_PIN_OPTION_SET_SUCCESS,
    DISABLE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const disablePinOptionSetRequest = () => ({
    type: DISABLE_PIN_OPTION_SET_REQUEST,
});

export const disablePinOptionSetSuccess = payload => ({
    type: DISABLE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const disablePinOptionSetFailure = error => ({
    type: DISABLE_PIN_OPTION_SET_FAILURE,
    error,
});

export default id => async dispatch => {
    dispatch(disablePinOptionSetRequest());

    return axios
        .patch(`${API_URL}/pinoptions/sets/${id}/disable?undo=false`, null, getHeaders())
        .then(res => dispatch(disablePinOptionSetSuccess(res.data)))
        .catch(err => dispatch(disablePinOptionSetFailure(err.message)));
};
