import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DELETE_ADMIN_PIN_OPTION_REQUEST,
    DELETE_ADMIN_PIN_OPTION_SUCCESS,
    DELETE_ADMIN_PIN_OPTION_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const deletePinOptionRequest = payload => ({
    type: DELETE_ADMIN_PIN_OPTION_REQUEST,
    payload,
});

export const deletePinOptionSuccess = payload => ({
    type: DELETE_ADMIN_PIN_OPTION_SUCCESS,
    payload,
});

export const deletePinOptionFailure = (error, payload) => ({
    type: DELETE_ADMIN_PIN_OPTION_FAILURE,
    error,
    payload,
});

export default id => async dispatch => {
    dispatch(deletePinOptionRequest(id));

    return axios
        .delete(`${ADMIN_API_URL}/pinoptions/options/${id}`, getHeaders())
        .then(() => dispatch(deletePinOptionSuccess(id)))
        .catch(err => dispatch(deletePinOptionFailure(err.message, id)));
};
