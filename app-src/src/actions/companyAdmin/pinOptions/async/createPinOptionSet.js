import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CREATE_PIN_OPTION_SET_REQUEST,
    CREATE_PIN_OPTION_SET_SUCCESS,
    CREATE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const createPinOptionSetRequest = () => ({
    type: CREATE_PIN_OPTION_SET_REQUEST,
});

export const createPinOptionSetSuccess = payload => ({
    type: CREATE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const createPinOptionSetFailure = error => ({
    type: CREATE_PIN_OPTION_SET_FAILURE,
    error,
});

export default postBody => async dispatch => {
    dispatch(createPinOptionSetRequest());

    return axios
        .post(`${API_URL}/pinoptions/sets`, postBody, getHeaders())
        .then(res => dispatch(createPinOptionSetSuccess(res.data)))
        .catch(err => dispatch(createPinOptionSetFailure(err.message)));
};
