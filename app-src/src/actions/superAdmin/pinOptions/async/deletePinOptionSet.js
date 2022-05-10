import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    DELETE_ADMIN_PIN_OPTION_SET_REQUEST,
    DELETE_ADMIN_PIN_OPTION_SET_SUCCESS,
    DELETE_ADMIN_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const deletePinOptionSetRequest = payload => ({
    type: DELETE_ADMIN_PIN_OPTION_SET_REQUEST,
    payload,
});

export const deletePinOptionSetSuccess = payload => ({
    type: DELETE_ADMIN_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const deletePinOptionSetFailure = (error, payload) => ({
    type: DELETE_ADMIN_PIN_OPTION_SET_FAILURE,
    error,
    payload,
});

export default id => async dispatch => {
    dispatch(deletePinOptionSetRequest(id));

    return axios
        .delete(`${ADMIN_API_URL}/pinoptions/sets/${id}`, getHeaders())
        .then(() => dispatch(deletePinOptionSetSuccess(id)))
        .catch(err => dispatch(deletePinOptionSetFailure(err.message, id)));
};
