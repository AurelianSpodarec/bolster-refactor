import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DUPLICATE_PIN_OPTION_SET_REQUEST,
    DUPLICATE_PIN_OPTION_SET_SUCCESS,
    DUPLICATE_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const duplicatePinOptionSetRequest = () => ({
    type: DUPLICATE_PIN_OPTION_SET_REQUEST,
});

export const duplicatePinOptionSetSuccess = payload => ({
    type: DUPLICATE_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const duplicatePinOptionSetFailure = error => ({
    type: DUPLICATE_PIN_OPTION_SET_FAILURE,
    error,
});

export default setID => async dispatch => {
    dispatch(duplicatePinOptionSetRequest());

    return axios
        .post(`${API_URL}/pinoptions/sets/${setID}/duplicate`, null, getHeaders())
        .then(res => dispatch(duplicatePinOptionSetSuccess(res.data)))
        .catch(err => dispatch(duplicatePinOptionSetFailure(err.message)));
};
